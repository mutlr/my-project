import React, { useEffect } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import './Postform.css';
import axios from 'axios';
const api = 'BQDO4XKUV7DjPuz2RakF_p20USkmgTYWVzXLPaKFO5wVmaWAIscGHqmtcze5FnykOcyl3nEgqwEnUrwAz4zzfIQKJ32ErO69IBIK2Le2AQGGa8zgIig';
interface FormValues {
    song: string;
}

const Postform = () => {
    const initialValues: FormValues = { song: '' };

    const handleSubmit = (values: FormValues) => {
        console.log('Submitted value:', values.song);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <MyForm />

        </Formik>
    );
};

const MyForm = () => {
    const formik = useFormikContext<FormValues>();

    // Access form values outside of submit function
    useEffect(() => {
        if (formik.values.song.length < 3) return;
        console.log('Formik value: ', formik.values.song);
        axios.get(`https://api.spotify.com/v1/search?q=${formik.values.song}%20plan&type=track&limit=5`, {
            headers: {
                'Authorization': `Bearer ${api}`
            }
        })
        .then(result => result.data.tracks.items.map((r: any) => {
            //console.log('R: ', r);
            const item = {
                artist: {
                    artistName: r.artists[0].name,
                    id: r.artists[0].id
                },
                song: {
                    songName: r.name,
                    id: r.id
                }
            };
            console.log('Song: ', item);
        }));
        console.log('Current value:', formik.values.song);

    }, [formik.values.song]);

    return (
        <Form className="post-form">
            <label htmlFor="song">Song name</label>
            <Field type="text" className="formInput" name="song" />
            <button type="submit">Submit</button>
        </Form>
    );
};

export default Postform;
