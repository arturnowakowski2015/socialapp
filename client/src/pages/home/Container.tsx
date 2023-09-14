import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { Card } from "./Card";
import { Notifications } from "../../model/Interface";
import "./card.css";
const style = {
  width: 400,
  display: "flex",
  FlexDirection: "row",
};

export interface Item {
  id: number;
  text: string;
  title: string;
}
export interface Items {
  id: number;
  text: string;
  title: string;
  ariaHidden?: string;
}

interface IProps {
  notifications: Notifications;
}
export const Container = ({ notifications }: IProps) => {
  {
    const [cards, setCards] = useState<Items[]>([
      {
        id: 0,
        text: "f fa-regular fa-comment",
        title: "comments",
      },
      { id: 1, text: "f fa-regular fa-heart", title: "likes" },
      { id: 2, text: "f fa-regular fa-user", title: "users" },
      { id: 3, text: "fa fa-bell-o", ariaHidden: "true", title: "posts" },
    ]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, []);
    const [draggable, setDraggable] = useState<boolean>(false);

    const onmouseover = () => {
      setDraggable(true);
    };
    const make = () => {
      setDraggable(false);
    };
    const [slide, setSlide] = useState<boolean>(false);
    const renderCard = useCallback(
      (
        card: { id: number; text: string },
        index: number,
        draggable: boolean,
        notifications: Notifications
      ) => {
        let str = cards[card.id].title;
        return (
          <>
            {" "}
            {draggable === true ? (
              <>
                <Card
                  key={card.id}
                  index={index}
                  id={card.id}
                  text={card.text}
                  moveCard={moveCard}
                  notifications={notifications}
                />
              </>
            ) : (
              <i
                className={card.text + " ielem"}
                style={{
                  height: "20px",
                  width: "20px",
                  padding: "3.2px",
                  margin: "3.2px",
                  border: "1px dashed white",
                }}
                onMouseOver={() => {
                  setSlide(true);
                }}
              >
                {notifications?.[str as keyof typeof notifications]?.length !==
                  0 && (
                  <div className="alert" onClick={() => {}}>
                    {notifications?.[str as keyof typeof notifications]?.length}
                  </div>
                )}
              </i>
            )}
          </>
        );
      },
      []
    );

    return (
      <>
        {!draggable ? (
          <>
            {JSON.stringify(slide)}
            <div
              onClick={() => onmouseover()}
              onMouseOut={() => setSlide(false)}
              className={slide ? "customize" : "none"}
            >
              customize
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              make();
              setSlide(false);
            }}
            className="update"
          >
            update
          </div>
        )}
        <div style={style}>
          {cards.map((card, i) =>
            renderCard(card, i, draggable, notifications)
          )}
        </div>
      </>
    );
  }
};
