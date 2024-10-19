'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
    searchInput: string;
    setSearchInput: (input: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchInput, setSearchInput] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchInput, setSearchInput }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
