// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { generateClient } from 'aws-amplify/api';
// import { listGames, getGame } from '../graphql/queries';

// const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//     const [games, setGames] = useState([]);
//     const [selectedGame, setSelectedGame] = useState(null);
//     const [selectedLevel, setSelectedLevel] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchGames = async () => {
//             const client = generateClient();
//             try {
//                 const result = await client.graphql({ query: listGames });
//                 if (result.errors) {
//                     console.error(result.errors);
//                     return;
//                 }
//                 if (result.data?.listGames?.items) {
//                     setGames(result.data.listGames.items);
//                 }
//             } catch (err) {
//                 console.error("Error fetching games:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchGames();
//     }, []);

//     const fetchGameById = async (gameId) => {
//         const client = generateClient();
//         try {
//             const result = await client.graphql({
//                 query: getGame,
//                 variables: { id: gameId },
//             });
//             if (result.errors) {
//                 console.error(result.errors);
//                 return;
//             }
//             if (result.data?.getGame) {
//                 setSelectedGame(result.data.getGame);
//             }
//         } catch (err) {
//             console.error("Error fetching game by ID:", err);
//         }
//     };

//     return (
//         <GameContext.Provider value={{ games, selectedGame, selectedLevel, setSelectedGame, setSelectedLevel, fetchGameById, loading }}>
//             {children}
//         </GameContext.Provider>
//     );
// };

// export const useGameContext = () => {
//     return useContext(GameContext);
// };
