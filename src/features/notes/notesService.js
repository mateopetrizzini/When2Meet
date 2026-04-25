import { supabase } from "../../services/supabase";

export const getNotes = async () => {

    const {data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending:false});

    return { data, error };;

};

export const createNote = async (content, userId, reminderAt = null) => {
    
    const { data, error } = await supabase
        .from("notes")
        .insert([{
            content,
            user_id:userId,
            reminder_at: reminderAt,
            },
        ]).select();

    return {data, error };
};

export const deleteNote = async (id) => {

    const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id);

        return { error };
}

export const updateNote = async (id, content) => {

    const { data, error } = await supabase
        .from("notes")
        .update({ content })
        .eq("id", id)
        .select();

        return { data, error };
}

