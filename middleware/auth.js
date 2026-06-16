const jwt=require('jsonwebtoken');//importation de jsonwebtoken pour la verificaton du token
//exportation d'une fct middellware qui va verifier le token dans les requettes entrantes et autoriser l'acces aux routes proteges si le token esr valide ,sinon elle renvoie une reo=ponse d'errreur 401(Unauthorized)pour indiquer que l'acces est refuse
//les 3 variables :req: les donnees de requet clinet, res: donnes de reponse serveru, next: pour passer la route suivante si le token est valide

module.exports=function(req,res,next){
    // recuperation de token envoye par le client dans le header de la requete ,le token doit etre envoyé dans le format "Bearer"
    const authHeader=req.header("Authorization");
    //on va verifier si le token existe et commence par"Bearer" ,si ce n'est le cas ,in envoie une reponse d'erreur 401 (Unauthorized pour indiquer que l'acces eest refuse) 
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message:"No token,authorization denied"});

    }
    //extraction de token de la partie "Bearer" du header,on utilise la methode split pour diviser la header en deux parties
    const token=authHeader=jwt.split('')[1];
    try{
        // verification de token en utilisant la methode verify de jsonwebtoken,qui prend le token et la clé secréte comme arguments.Si le token est valide, la methode decode le token et retourne les informations qu'il contient (comme l'id de l'instructeur).Ces informations sont ensuite attachées à l'objet req pour les rendre accessible dans les routes proteges

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.authot=decoded;
        next();
    }catch(error){
        return res.status(401).json({message:'Token is not valid'})
    }
}