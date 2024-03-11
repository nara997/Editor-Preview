// import React from 'react'

import { useEffect, useState } from "react"
import { Editor, IfilterData } from "./edit"
import { stringify } from "querystring"
// import { useHistory } from 'react-router-dom';
// import { Link } from "react-router-dom";



export const Home = () => {
    const [data, setData] = useState<IfilterData[]>([])
    const [filterData, setFilterData] = useState<IfilterData[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [avatar,setAvatar] =useState<IfilterData[]>([])

    // const history = useHistory();

    // const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://italent2.demo.lithium.com/api/2.0/search?q=SELECT id,body, subject, author,conversation FROM messages where depth=0");
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
            // console.log("updatedData", updatedData);
            setAvatar(updatedData);
        };
    
        fetchAuthorAvatars();
    }, [data]); 

    console.log("data", data)

    const buttonhandle = (id: string) => {
        const filtered = data.filter(item => item.id === id);
        setFilterData(filtered)
        setOpen(true)
    }
    console.log("avatar", avatar)


    return (
        <div className="main-dev container max-2xl mx-auto" >
            <div className="">
                <img
                    src="https://www.italentdigital.com/wp-content/uploads/2022/08/italent-logo-black.svg"
                    alt="italent-logo"
                />
            </div>
            {open === false && (
                <div className="min-w-36">
                    <h1 className="text-center p-6 font-semibold text-2xl">
                        Message Moderator
                    </h1>
                    {avatar&&avatar.map((items: any, index) => (
                        <div className="border-b border-slate-200 pb-4 flex gap-5 flex-col w-[650px] mx-auto">
                            <div
                                key={index}
                                className="hr p-6 gap-3 underline-offset-1 min-h-11 flex justify-between h-24"
                            >
                                <img className="rounded-3xl" src={items.avatar} alt="Avatar" />
                                <div className="text-gray-700 flex-grow break-all text-sm font-normal">
                                    <p
                                        className="text-sm font-medium underline underline-offset-1 pb-1"
                                        onClick={() => buttonhandle(items.id)}
                                    >
                                        {items.subject}
                                    </p>
                                    {/* <p className="text-sm">{items.subject}</p> */}
                                    <p className="pb-1">by ADMIN <span className="font-bold" >{items.author.login}</span></p>
                                    <p className="pb-1">last post time on {items.conversation.last_post_time}</p>
                                </div>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                    onClick={() => buttonhandle(items.id)}
                                >
                                    Moderate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {open === true && <div>
                <Editor filterData={filterData} setOpen={setOpen} />
            </div>

            }
        </div>
    )
}