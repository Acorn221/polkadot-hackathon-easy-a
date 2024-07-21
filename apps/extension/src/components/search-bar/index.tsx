import { useState } from "react";
import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";  // Correct the import path for Input
import { SearchIcon } from "lucide-react";

export const SearchBar = () => {
    const [search, setSearch] = useState<string>('');

    const doSearch = () => {
			
        window.open(`https://www.google.com/search?q=${encodeURIComponent(search)}`,"_self");
				// await chrome.tabs.create({ url: `https://www.google.com/search?q=${encodeURIComponent(search)}` });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        doSearch();
    };

    return (
        <>
            <CardTitle>Search</CardTitle>
            <CardDescription className="flex justify-center align-middle h-full text-2xl">
                <form className="m-auto flex gap-4 w-1/2 min-w-14" onSubmit={handleSubmit}>
                    <Input 
                        placeholder="Google what is Polkadot..." 
                        className="flex-1" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <Button type="submit" className="flex gap-2"><div className="flex-1">Submit</div><SearchIcon /></Button>
                </form>
            </CardDescription>
        </>
    );
};
