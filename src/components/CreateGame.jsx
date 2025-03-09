import React, { useEffect } from 'react'
import { generateClient } from 'aws-amplify/api';
import { createGame } from '../graphql/mutations';

const CreateGame = () => {

    useEffect(() => {
        const handleCreateGame = async () => {
            const client = generateClient();
            const gameDetails = {
                input: {
                    name: "Example Game",
                    description: "This is an example game.",
                    image: "https://example.com/image.png",
                    levels: ["Beginner", "Intermediate", "Advanced"]
                }
            };

            try {
                const newGameData = await client.graphql({
                    query: createGame,
                    variables: gameDetails
                });
                console.log('Game created:', newGameData);
                alert('Game created successfully!');
            } catch (err) {
                console.error('Error creating game:', err);
                alert('Failed to create game.');
            }
        };

        handleCreateGame();
    }, []);

  return (
    <div>CreateGame</div>
  )
}

export default CreateGame