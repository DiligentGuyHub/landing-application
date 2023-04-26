// @ts-ignore
import labels from "../labels.json";
import React from "react";

interface NavigationProps {
    isBackButtonEnabled: boolean;
    isContinueButtonEnabled: boolean;
    isSubmitButtonEnabled: boolean;
    handleBackClick: () => void;
    handleContinueClick: () => void;
    handleSubmitClick: () => void;
}

export const NavigationBar = ({
                                  isBackButtonEnabled,
                                  isContinueButtonEnabled,
                                  isSubmitButtonEnabled,
                                  handleBackClick,
                                  handleContinueClick,
                                  handleSubmitClick
                              }: NavigationProps) => {
    return (<div className="button-container">
        {isBackButtonEnabled && (
            <div className="button-wrapper back-button-wrapper">
                <button className="navigation-button back-button"
                        onClick={handleBackClick}>
                    {labels['prev-question-button']}
                </button>
            </div>
        )}
        {isContinueButtonEnabled && (
            <div className="button-wrapper continue-button-wrapper">
                <button className="navigation-button continue-button"
                        onClick={handleContinueClick}>
                    {labels['next-question-button']}
                </button>
            </div>
        )}
        {isSubmitButtonEnabled && (
            <div className="button-wrapper submit-button-wrapper">
                <button className="navigation-button submit-button" onClick={handleSubmitClick}>
                    {labels['submit-survey-button']}
                </button>
            </div>
        )}
    </div>)
}