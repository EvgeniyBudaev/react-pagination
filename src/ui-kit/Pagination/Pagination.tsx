import React, { useState, useEffect, Dispatch } from "react";

interface IPaginationProps {
  pages: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  onChange: (number) => void;
  onGoBack: (number) => void;
  onGoForward: (number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  pages = 10,
  setCurrentPage,
  onChange,
  onGoBack,
  onGoForward,
}) => {
  //Set number of pages
  const numberOfPages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  // Current active button number
  const [currentButton, setCurrentButton] = useState(1);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    const dotsInitial = -100;
    const dotsLeft = -101;
    const dotsRight = -99;

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, 5, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 5);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 3);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 3);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
    onChange(currentButton);
    onGoBack(currentButton);
    onGoForward(currentButton);
  }, [
    currentButton,
    setCurrentPage,
    setCurrentButton,
    onChange,
    onGoBack,
    onGoForward,
  ]);

  const handlePageChange = item => {
    if (item !== currentButton) {
      setCurrentButton(item);
    }
  };

  const handlePageGoBack = () => {
    setCurrentButton(prev => (prev <= 1 ? prev : prev - 1));
  };

  const handlePageGoForward = () => {
    setCurrentButton(prev => (prev >= numberOfPages.length ? prev : prev + 1));
  };

  const handleItemNumberOrDots = (item: number) => {
    if (item === -100) {
      return "...";
    } else if (item === -101) {
      return " ...";
    } else if (item === -99) {
      return "... ";
    } else {
      return item;
    }
  };

  return (
    <div className="pagination-container">
      <a
        href="#"
        className={`${currentButton === 1 ? "disabled" : ""}`}
        onClick={handlePageGoBack}
      >
        Prev
      </a>

      {arrOfCurrButtons.map((item, index) => {
        return (
          <a
            href="#"
            key={index}
            className={`${currentButton === item ? "active" : ""}`}
            onClick={() => handlePageChange(item)}
          >
            {handleItemNumberOrDots(item)}
          </a>
        );
      })}

      <a
        href="#"
        className={`${
          currentButton === numberOfPages.length ? "disabled" : ""
        }`}
        onClick={handlePageGoForward}
      >
        Next
      </a>
    </div>
  );
};

export { Pagination };
