import { supabase } from "@/lib/supabase";
// import { entryDataType, newEntryDataType, setEntryDataType } from "@/src/types/data";
// import { getSessionUserID } from "../providers/UserProvider/UserProvider";


// user for all route handlers
// const userID = useUser();

// function for getting all idioms
// export const fetchIdioms = async () => {};

// function for getting today's idiom
export const getDailyIdiom = async () => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format as yyyy-mm-dd
        // console.log('today in daily idiom', today);

        // testing hello world rpc works
        // const { data, error } = await supabase.rpc('hello_world');
        const { data, error } = await supabase
            .from('idioms')
            .select('*')
            .eq('daily_date', today);
        if (error) throw error;
        // console.log('fetched random idiom Express', data[0]);
        return data[0];
    } catch (error) {
        console.error('Error fetching notes from supabase', error);
    }
    //   
    return [];
};


// function for getting random idiom
export const getRandomIdiom = async () => {
    //   const userID = await getSessionUserID();
    try {
        // testing hello world rpc works
        // const { data, error } = await supabase.rpc('hello_world');
        const { data, error } = await supabase.rpc('get_random_idiom');
        // rpc (remote procedure call) calls db function
        if (error) throw error;
        // console.log('fetched random idiom Express', data[0]);
        return data[0];
    } catch (error) {
        console.error('Error fetching notes from supabase', error);
    }
    //   
    return [];
};
