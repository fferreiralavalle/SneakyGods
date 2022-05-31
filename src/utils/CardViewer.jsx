import React from "react";
import domtoimage from "dom-to-image";
import { icons } from "../config/icons";
import { keywords } from "../config/keywords";

const renderWord = (word, isLast, keyword, IconComponent) => {
  return (
    <span style={{ display: "flex", color: keyword ? `${keyword.color}` : "" }}>
      {keyword && keyword.icon && (
        <IconComponent src={keyword.icon} alt={word} />
      )}
      {word}
      {!isLast && " "}
    </span>
  );
};

export const renderFormattedEffect = (text, Parent, IconComponent) => {
  let content = <Parent>{[text]}</Parent>;
  Object.values(icons).forEach(s => {
    if (s.alias) {
      s.alias.forEach(a => {
        let i = 0;
        while (i < content.props.children.length) {
          const child = content.props.children[i];
          if (typeof child === "string" || child instanceof String) {
            const modAlias = `{${a}}`;
            const icon = <IconComponent src={s.icon} alt={a} />;
            let newChildren = child.split(modAlias);
            let newChildrenWithIcons = [];
            newChildren.forEach((c, index) => {
              c.replace(modAlias, "");
              newChildrenWithIcons.push(c);
              if (index < newChildren.length - 1) {
                newChildrenWithIcons.push(icon);
              }
            });
            content.props.children.splice(i, 1, ...newChildrenWithIcons);
          }
          i++;
        }
      });
    }
  });
  const wordSeparatedEffect = [];
  const { children } = content.props;
  children.forEach((c, i) => {
    if (typeof c === "string" || c instanceof String) {
      if (c !== "") {
        const wordEffect = c.split(" ");
        wordEffect.forEach((word, index) => {
          let isAlias = false;
          Object.values(keywords).forEach(k => {
            if (k.alias) {
              k.alias.forEach(a => {
                const modAlias = `[${a}]`;
                if (word.includes(modAlias)) {
                  isAlias = true;
                  const wordParts = word.split(modAlias);
                  word = word.replace(modAlias, "");
                  wordParts.forEach((part, wi) => {
                    const dontAddSpace = wi < wordParts.length - 1;
                    if (part !== "")
                      wordSeparatedEffect.push(renderWord(part, dontAddSpace));
                    if (wi < wordParts.length - 1) {
                      wordSeparatedEffect.push(
                        renderWord(
                          k.label,
                          !(
                            wordParts[wi + 1] === "" &&
                            !(
                              i === children.length - 1 &&
                              index === wordEffect.length - 1
                            )
                          ),
                          k,
                          IconComponent
                        )
                      );
                    }
                  });
                }
              });
            }
          });
          const isLast =
            i === children.length - 1 && index === wordEffect.length - 1;
          if (word !== "" && !isAlias)
            wordSeparatedEffect.push(renderWord(word, isLast));
        });
      }
    } else {
      wordSeparatedEffect.push(c);
    }
  });

  content = <Parent>{wordSeparatedEffect}</Parent>;
  return content;
};

export const saveCard = (cardId, cardName) => {
  const node = document.getElementById(cardId);
  domtoimage
    .toPng(node)
    .then(dataUrl => {
      const previewContainer = document.createElement("a");
      previewContainer.href = dataUrl;
      previewContainer.download = `${cardName}.png`;
      previewContainer.click();
    })
    .catch(error => {
      console.error("oops, something went wrong!", error);
    });
};

export const saveCardFormated = card => {
  const dictstring = JSON.stringify(card);
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    dictstring
  )}`;
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${card.name}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const getCardId = () => `card-id-${name}`;
