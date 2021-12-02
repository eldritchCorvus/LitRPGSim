import styled from '@emotion/styled';
import { Fragment, useEffect, useState } from 'react';
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import book_graphic from './../../images/bookbg.jpg';

export const GuestBook = () => {
    const Container = styled.div`
        position: relative;
    `
    const Signatures = styled.div`
        position: absolute;
        top: 41px;
        left: 55px;
        width: 300px;
        height: 500px;
        overflow: auto;
    `

    const Quip = styled.div`
        font-weight: bolder;
    `

    const Title = styled.div`
        font-weight: 100;
        margin-bottom: 15px;
    `

    const BG = styled.img`
        position: absolute;
    `

    const dialog = useDialogState();
    const [initialShowing, setInitialShowing] = useState(true);

    const getPossibleTitles = ()=>{
        //JR NOTE: TODO collate all titles from classes, use these to replace their names.
    }

    const inititialSignatures = [
        {quip: "Please give me a quip to post here.", title: "Herald of Beef"},
        {quip: "Please give me a quip to post here.", title: "Weaver of Eyes"},
        {quip: "Please give me a quip to post here.", title: "Taxonomist"},
        {quip: "Please give me a quip to post here.", title: "Scribe"},
        {quip: "Please give me a quip to post here.", title: "Chronicler"},
        {quip: "Please give me a quip to post here.", title: "Speaker"},
        {quip: "Please give me a quip to post here.", title: "Forsaken"},
        {quip: "Please give me a quip to post here.", title: "Catalyst"},
    ];
    const [signatures, setSignatures] = useState(inititialSignatures);

    useEffect(() => {
        if (initialShowing) {
            dialog.setVisible(true);
            setInitialShowing(false);
        }
    }, [initialShowing])

    return (
        <Fragment key={'guestbook'}>
            <DialogDisclosure style={{ display: "none" }}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
            <Dialog {...dialog} tabIndex={0} style={{ border: "none", outline: "none", position: "fixed", top: "0%", left: "25%", width: "600px" }}>
                <Container>
                   <img src ={book_graphic}/>
                   <Signatures>
                       <ul>
                        {signatures.map((item)=>(
                            <li>
                                <Quip>{item.quip}</Quip>
                                <hr></hr>
                                <Title>-{item.title}</Title>
                            </li>
                        ))}
                       </ul>

                   </Signatures>
                </Container>
            </Dialog>
        </Fragment>
    )

}