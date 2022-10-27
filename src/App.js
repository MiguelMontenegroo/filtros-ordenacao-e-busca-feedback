import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaId, setBuscaId] = useState("");
 const [buscaTipo, setBuscaTipo] = useState("");
 const [ordenaAlfabeto, setOrdenaAlfabeto] = useState("")
  return (
    <>
      <GlobalStyle />
      <Header
        buscaNome={buscaNome}
        setBuscaNome={setBuscaNome}
        buscaId={buscaId}
        setBuscaId={setBuscaId}
        buscaTipo={buscaTipo}
        setBuscaTipo={setBuscaTipo}
        ordenaAlfabeto={ordenaAlfabeto}
      setOrdenaAlfabeto={setOrdenaAlfabeto}
      />
      <CardsContainer>
        {pokemons
        .filter((pokemon) => {
          return buscaId ? pokemon.id.includes(buscaId) : pokemon
        })
          .filter((pokemon) => {
            return pokemon.name.english.toLowerCase().includes(buscaNome.toLowerCase());
          })
          .sort((a, b) =>{
            if(ordenaAlfabeto === "crescente"){
              if(a.name.english < b.name.english){
                return -1
              } else {
                return 1
              }
              } else if(ordenaAlfabeto === "decrescente") {
                if(a.name.english < b.name.english) {
                return  1
              } else {
                return -1
              }
            }
           })
          .filter((pokemon) => {
            return buscaTipo ? pokemon.type.includes(buscaTipo) : pokemon
           })
          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
