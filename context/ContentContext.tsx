import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HERO_DATA, ABOUT_DATA, EXPERIENCE, PROJECTS, SKILLS, CONTACT_INFO, SOCIAL_LINKS } from '../constants';

// --- FIREBASE IMPORTS ---
import { db } from '../src/firebase'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';

const defaultState = {
  hero: HERO_DATA,
  about: ABOUT_DATA,
  experience: EXPERIENCE,
  projects: PROJECTS,
  skills: SKILLS,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  settings: { password: "admin" }
};

type ContentType = typeof defaultState;

interface ContentContextType {
  content: ContentType;
  updateContent: (section: keyof ContentType, data: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultState,
  updateContent: () => {},
  resetContent: () => {}
});

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(defaultState);
  const [loading, setLoading] = useState(true); // Loading state add kiya

  // 1. FETCH DATA FROM FIREBASE (Website load hone par)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "portfolio", "data"); // Database path
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Agar cloud pe data hai, toh use state me set karo
          // Hum merge kar rahe hain taaki agar naye fields missing hon toh code na phate
          const cloudData = docSnap.data();
          setContent((prev) => ({
            ...prev,
            ...cloudData,
            // Skills aur Social me icons hote hain, toh unhe careful handle karte hain
            // Agar cloud me skills nahi hain to default use karo
            skills: cloudData.skills || prev.skills, 
            social: cloudData.social || prev.social 
          }));
        } else {
          // Agar first time hai, to default data cloud pe upload karo
          await setDoc(docRef, defaultState);
          setContent(defaultState);
        }
      } catch (error) {
        console.error("Error fetching from Firebase:", error);
        // Error aaye to default data dikhao
        setContent(defaultState);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. SAVE DATA TO FIREBASE (Jab Admin update karega)
  const updateContent = async (section: keyof ContentType, data: any) => {
    // Pehle local UI update karo (fast feel ke liye)
    setContent((prev) => {
      const newContent = { ...prev, [section]: data };
      
      // Background me Cloud pe save karo
      const docRef = doc(db, "portfolio", "data");
      // 'merge: true' zaroori hai taaki baki sections delete na ho jayein
      setDoc(docRef, { [section]: data }, { merge: true })
        .then(() => console.log(`${section} saved to cloud`))
        .catch((e) => console.error("Save failed:", e));

      return newContent;
    });
  };

  // 3. RESET DATA (Cloud ko wapas default kar dega)
  const resetContent = async () => {
    if(window.confirm("WARNING: This will reset your live portfolio data to defaults. Are you sure?")) {
      try {
        const docRef = doc(db, "portfolio", "data");
        await setDoc(docRef, defaultState);
        setContent(defaultState);
        alert("Data reset successfully!");
      } catch (e) {
        console.error("Reset failed:", e);
        alert("Reset failed. Check console.");
      }
    }
  };

  // Loading Screen (Jab tak data aa raha hai)
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0f172a] flex flex-col items-center justify-center text-[#2dd4bf] gap-4">
         <div className="w-12 h-12 border-4 border-[#2dd4bf] border-t-transparent rounded-full animate-spin"></div>
         <p className="font-mono animate-pulse text-sm">Loading Portfolio Data...</p>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);