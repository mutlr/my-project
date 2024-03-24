import React, { useState } from "react";

const useVisibility = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const isOpen = { display: visible ? '' : 'none' };
    const toggleVisibility = (): void => {
        setVisible(!visible);
    };
    return {
        toggleVisibility,
        isOpen: isOpen.display,
    };
};

export default useVisibility;