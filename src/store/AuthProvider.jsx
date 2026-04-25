import { useEffect, useState } from "react";
import { supabase } from '../services/supabase';
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getSession = async () => {
        const {data} = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        };

        getSession();

        const { data: listener} = supabase.auth.onAuthStateChange(
            (_, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => listener?.subscription?.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

