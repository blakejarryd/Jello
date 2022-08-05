import { useState, useEffect } from 'react';
import React from 'react';
import Column from './Column';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Board = ({
  board,
  setBoard,
  editBoard,
  editCardsStatus,
  createColumn,
  deleteColumn,
}) => {
  const [cards, setCards] = useState(null);
  const [editing, setEditing] = useState(false);

  const switchEdit = () => {
    setEditing(!editing);
  };

  const getCards = async () => {
    const url = '/cards';
    const res = await fetch(url);
    const cardData = await res.json();
    let boardCards = cardData.filter((card) => board.cards.includes(card._id));
    let columns = {};
    for (let i = 0; i < board.columns.length; i++) {
      columns[board.columns[i]] = [];
      columns[board.columns[i]] = boardCards.filter(
        (card) => board.columns[i] === card.status
      );
    }
    setCards(columns);
  };

  const addNewCardToBoard = async (card, board) => {
    await fetch(`/boards/${board._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards: [...board.cards, card._id] }),
    });
  };

  const handleCreate = async (name, status) => {
    console.log(name);
    console.log(status);
    let len = cards[status].length;
    const res = await fetch('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: name, status: status, rank: len }),
    });
    const newCard = await res.json();
    setCards({
      ...cards,
      newCard,
    });
    setBoard({
      ...board,
      cards: [...board.cards, newCard._id],
    });
    addNewCardToBoard(newCard, board);
  };
  const handleEdit = async (cardName, cardID) => {
    console.log(cardID);
    await fetch(`/cards/${cardID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: cardName }),
    });
    // This needs to be changed to a findByIDAndUpdate instead of fetching, cause its slow
    getCards();
  };
  const handleEditRank = async (cardID, cardRank, column, originalRank) => {
    let columnsCards = cards[column];
    for (let i = 0; i < columnsCards.length; i++) {
      if (columnsCards[i].rank > cardRank) {
        let newRank = columnsCards[i].rank + 1;
        await fetch(`/cards/${columnsCards[i]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rank: newRank }),
        });
      } else if (
        columnsCards[i].rank < cardRank &&
        columnsCards[i].rank > originalRank
      ) {
        let newRank = columnsCards[i].rank - 1;
        await fetch(`/cards/${columnsCards[i]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rank: newRank }),
        });
      }
    }
    console.log(cardID);
    await fetch(`/cards/${cardID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rank: cardRank }),
    });
    // This needs to be changed to a findByIDAndUpdate instead of fetching, cause its slow
    getCards();
  };
  const handleDrop = async (cardID, updatedColumn) => {
    console.log('update', cardID, updatedColumn);
    await fetch(`/cards/${cardID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: updatedColumn }),
    });

    getCards();
  };
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (!result) {
      return;
    }
    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }
    const start = result.source.droppableId;
    const end = result.destination.droppableId;
    console.log('start end', start, end);
    let newCards = cards;
    if (start === end) {
      const items = Array.from(cards[start]);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      newCards[start] = items;
      handleEditRank(
        result.draggableId,
        result.destination.index,
        end,
        result.source.index
      );
    } else if (start !== end) {
      const oldItems = Array.from(cards[result.source.droppableId]);
      const reorderedItem = oldItems.splice(result.source.index, 1);
      const newItems = Array.from(cards[end]);
      newItems.splice(result.destination.index, 0, reorderedItem);
      newCards[start] = oldItems;
      newCards[end] = newItems;
      handleDrop(result.draggableId, end);
      handleEditRank(result.draggableId, result.destination.index, end);
    }
    setCards(newCards);
  };

  useEffect(() => {
    getCards();
  }, [board]);

  const columnsList = board.columns.map((column) => {
    return (
      cards && (
        <div className="stacks">
          <Column
            key={column}
            name={column}
            cards={cards[column]}
            onFormSubmit={handleCreate}
            handleEdit={handleEdit}
            onDrop={handleDrop}
            board={board}
            editBoard={editBoard}
            editCardsStatus={editCardsStatus}
            handleDragEnd={handleDragEnd}
            deleteColumn={deleteColumn}
          />
        </div>
      )
    );
  });

  const BoardName = () => {
    return (
      <h1 className="m-2 boardtitle" onClick={switchEdit}>
        {board.name}
      </h1>
    );
  };

  const BoardNameEdit = () => {
    const [boardName, setBoardName] = useState(board.name);

    const handleChange = (event) => {
      setBoardName(event.target.value);
    };
    const submit = (event) => {
      event.preventDefault();
      editBoard({
        ...board,
        name: boardName,
      });
      switchEdit();
    };
    return (
      <form onSubmit={submit} className="m-3 d-flex align-content-center">
        <input
          className="p-1 fs-2"
          type="text"
          name="title"
          value={boardName}
          onChange={handleChange}
        />
        <Button className="m-1" type="submit" variant="secondary" size="lg">
          <i className="bi bi-arrow-return-right"></i>
        </Button>
      </form>
    );
  };

  return (
    <div className="whole-board">
      {!editing && <BoardName key="BoardName" />}
      {editing && <BoardNameEdit key="BoardNameEdit" />}
      <div className="horizontal-scroll">
        <DragDropContext onDragEnd={handleDragEnd}>
          {columnsList}
          <div className="horizontal-stacking">
            <Button className="new-column-btn" onClick={createColumn}>
              New Column
            </Button>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
