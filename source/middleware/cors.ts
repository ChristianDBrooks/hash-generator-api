import {Request, Response} from 'express';
const ALLOWED_ORIGINS: string[] = JSON.parse(process.env.ALLOWED_ORIGINS || "[]");

export const cors = (req: Request, res: Response, next: any) => {
  let origin = req.get('origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", origin);  
  } else {
    res.header("Access-Control-Allow-Origin", "null");  
    console.log("Forbidden Origin: " + origin);
    return res.status(403).json({message: "Forbidden Origin: " + origin})
  }
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
}