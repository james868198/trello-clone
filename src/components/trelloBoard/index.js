import { useSelector, useDispatch } from "react-redux"
import { useParams, Navigate } from "react-router-dom"
import { createList } from "./DataFetch"
import DNDProvider from "./DNDContext"
import TrelloList from "./trelloList"
import TrelloBoardNav from "./trelloBoardNav"
import styled from "styled-components"
import { getBoardById } from "../../store/slice/trelloBoardSlice"

// mul
import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button"

export const TrelloBoardContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.palette.background.main};
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.palette.primary.contrastText};
`

export const TrelloBoardHeader = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    max-height: 70px;
`

export const TrelloBoardContent = styled.div`
    position: relative;
    width: 100%;
    flex-grow: 1;
    overflow-x: scroll;
    overflow-y: scroll;
`

export const TrelloBoardContentContainer = styled.div`
    position: relative;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 16px;
`

export const TrelloListWrapper = styled.div`
    display: inline;
    min-height: 320px;
    min-width: 300px;
    width: 275px;
`

export default function TrelloBoard() {
    const { boardId } = useParams()
    const board = useSelector(getBoardById(boardId))

    if (board == null) {
        return <Navigate to="/404" />
    }

    // handlers
    const handleAddList = (e) => {
        e.stopPropagation()
        createList(boardId)
    }

    const CreateListBtn = () => {
        return (
            <TrelloListWrapper>
                <Button
                    sx={{
                        color: "white",
                        backgroundColor: "#359ad4",
                        "&:hover": {
                            backgroundColor: "#4da1d2",
                        },
                    }}
                    fullWidth
                    onClick={(event) => handleAddList(event)}
                    startIcon={<AddIcon />}
                >
                    Add another list
                </Button>
            </TrelloListWrapper>
        )
    }

    return (
        <DNDProvider>
            <TrelloBoardContainer>
                <TrelloBoardHeader>
                    <TrelloBoardNav board={board} />
                </TrelloBoardHeader>
                <TrelloBoardContent>
                    <TrelloBoardContentContainer>
                        {board.lists.map((listId, index) => {
                            return (
                                <TrelloListWrapper key={listId}>
                                    <TrelloList listId={listId} index={index} />
                                </TrelloListWrapper>
                            )
                        })}
                        <CreateListBtn />
                    </TrelloBoardContentContainer>
                </TrelloBoardContent>
            </TrelloBoardContainer>
        </DNDProvider>
    )
}
