import React, { useState, useEffect } from 'react';

const YourComponent = () => {
    const [data, setData] = useState([]);
    const [avatar,setAvatar] =useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://italent2.demo.lithium.com/api/2.0/search?q=SELECT id, subject, author FROM messages");
                const jsonData = await response.json();
                setData(jsonData.data.items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAuthorAvatars = async () => {
            const promises = data.map(async (item) => {
                try {
                    const authorId = JSON.stringify(item.author.id);
                    const response = await fetch(`https://italent2.demo.lithium.com/api/2.0/search?q=SELECT avatar.profile FROM users WHERE id = ${authorId}`);
                    const avatarData = await response.json();
                    console.log(avatarData.data.items[0].avatar.profile)
                    const avatar = avatarData.data.items[0].avatar.profile
                    return { ...item,avatar } 
                    // console.log(updatedItem)// Add avatarData to the item
                } catch (error) {
                    console.error("Error fetching author avatar:", error);
                    return item; // Return the original item if fetching avatar data fails
                }
            });
    
            const updatedData = await Promise.all(promises);
            console.log("updatedData", updatedData);
            setAvatar(updatedData);
        };
    
        fetchAuthorAvatars();
    }, [data]); 
    console.log(avatar)
    return (
        <div>
            {avatar&& avatar.map((item, index) => (
                <div key={index}>
                    <p>{item.subject}</p>
                    {/* {item.avatarData && ( */}
                        <img src={item.avatar} alt="Avatar" />
                    {/* )} */}
                </div>
            ))}
        </div>
    );
};

export default YourComponent;
