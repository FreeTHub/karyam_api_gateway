
import UserModel from "@/schema/user.schema";
import passport from "passport";
import { GoogleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
const opts:any={
	jwtFromRequest:"",
	secretOrKey:""
};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey=process.env.JWT_SECRET_KEY

passport.use(new JWTStrategy(opts,async(jwt_payload,done)=>{
	try{
		const _userExists = await UserModel.findById(jwt_payload._id).select("-password");
		if(_userExists) return done(null,_userExists);
		return done(null,false);
	}catch(error){
		return done(null,false);
	}

}));

passport.use(new GoogleStrategy({
	callbackURL:process.env.GOOGLE_CALLBACK_URL,
	clientId:process.env.GOOGLE_CLIENT_ID,
	clientSecret:process.env.GOOGLE_CLIENT_SECRET
},async(req:any,accessToken:any,refreshToken:any,profile:any,done:any)=>{
	try{
		const _existingUser = await UserModel.findOne({googleId:profile.id});
		if(_existingUser) return done(null,_existingUser);
		else{
			const _newUser = await UserModel.create({
				name:`${profile.name.givenName} ${profile.name.familyName}`,
				email:`${profile.emails[0]?.value}`,
				password:`${profile.id}`,
				googleId:`${profile.id}`
			});
			return done(null,_newUser);


		}


	}catch(error){
		done(error,null)

	}
}))

passport.serializeUser((user:any,done)=>{
	return done(null,user?._id);
})
passport.deserializeUser(async(id,done)=>{
	try{
		const _userExists = await UserModel.findById(id)
		done(null,_userExists);
	}catch(error){
		done(error,null);

	}

})