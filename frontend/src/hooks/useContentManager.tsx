import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { EditValues, Post } from "../types";
import { baseUrl } from "../utils/serviceUtils";
import { postMap } from "../utils/utils";
import { MessageContext } from "../context/messageContext";
import { deleteContentService, editContentService } from "../services/postService";

const useContentManager = (endpoint: string, id: number) => {
    const [content, setContent] = useState<Post[]>([]);
    const message = useContext(MessageContext);
    useEffect(() => {
        axios.get(`${baseUrl}/${endpoint}/all/${id}`)
        .then(result => {
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            setContent(result.data.data.map((r: any) => postMap(r)));
        })
        .catch(error => console.log('Error from useContentManager', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteContent = async (deleteID: number): Promise<void> => {
        try {
            await deleteContentService(endpoint, deleteID);
            setContent(content.filter(con => con.id !== deleteID));
            message?.success('Successfully deleted!');
        } catch (error) {
            message?.error('There was an error deleting content!');
            console.log('Error', error);
        }
    };

    const editContent = async (editID: number, content: EditValues): Promise<void> => {
        try {
            await editContentService(endpoint, editID, content);
            message?.success('Successfully edited!');
        } catch (error) {
            message?.error('There was an error editing content!');
            console.log('Error', error);
        }
    };
    return [ content, deleteContent, editContent ] as const;
};

export default useContentManager;