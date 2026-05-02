import { useState } from "react";
import { signIn, signUp } from "../features/auth/authService";

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if(isLogin) {
                const { error } = await signIn(email,password);
                if(error) throw error;
            } else {
                const { error } = await signUp(email, password);
                if (error) throw error;
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>{isLogin ? "Iniciar sesión" : "Crear cuenta"}</h2>

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    {isLogin ? "Ingresar" : "Registrarse"}
                </button>
                
                    <p className="auth-switch">
                    {isLogin ? (
                        <>
                        ¿No tienes cuenta?{" "}
                        <span onClick={() => setIsLogin(false)}>
                            Regístrate
                        </span>
                        </>

                    ) : (
                        <>
                            ¿Ya tienes cuenta? {" "}
                            <span onClick={() => setIsLogin(true)}>
                                Iniciar sesión
                            </span>
                        </>
                    )}
                </p>
            </div>

        </div>

        // <div style={{ maxWidth: "400px", margin: "auto" }}>

        //     <h2>{isLogin ? "Login" : "Register"}</h2>

        //     <form onSubmit={handleSubmit}>

        //         <input
        //             type="email"
        //             placeholder="Email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //         />

        //         <input
        //             type="password"
        //             placeholder="Password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             required
        //         />

        //         <button type="submit">
        //             {isLogin ? "Login" : "Register"}
        //         </button>

        //     </form>

        //     {error && <p style={{color: "red" }}> {error} </p> }

        //     <p className="auth-switch">
        //         {isLogin ? (
        //             <>
        //                 ¿No tienes cuenta? {" "}
        //                 <span onClick={() => setIsLogin(false)}>
        //                     Regístrate
        //                 </span>                        
        //             </>

        //         ) : (

        //             <>                    
        //             ¿Ya tienes cuenta?{" "}
        //             <span onClick={() => setIsLogin(true)}>
        //                  Iniciar sesión
        //             </span>
        //             </>

        //         )}
        //     </p>

        // </div>
    );
};

export default Auth;