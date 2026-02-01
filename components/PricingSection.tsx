import React from "react";
import { Link } from "react-router-dom";

const PricingSection: React.FC = () => {
  return (
    <section className="bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-orange-500 mb-6">Cenová ponuka na mieru</h2>
        <p className="text-zinc-300 text-lg mb-10 max-w-2xl mx-auto">
          Každý projekt je jedinečný. Pošlite nám nezáväzný dopyt a pripravíme vám férovú cenovú ponuku presne podľa vašich potrieb a predstáv.
        </p>
        <Link to="/kontakt" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-black px-10 py-4 rounded shadow-lg text-lg uppercase tracking-widest transition-all duration-200">
          Získať ponuku
        </Link>
      </div>
    </section>
  );
};

export default PricingSection;
