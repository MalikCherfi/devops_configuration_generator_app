import React from "react";
import "./App.css";
import { CiGenerator } from "./components/ci-generator/ci-generator";

const App: React.FC = () => {
  return (
    <div className="App dark min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Générateur de fichiers de configuration DevOps
          </h1>
          <p className="text-muted-foreground">
            Choisissez un répertoire local, un type de fichier et les jobs à
            inclure, puis générez le fichier à créer.
          </p>
        </div>

        <CiGenerator />
      </main>
    </div>
  );
};

export default App;
