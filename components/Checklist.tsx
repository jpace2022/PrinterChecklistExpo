import React, { useState } from 'react';

const Checklist = ({ items }) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheck = (item) => {
        setCheckedItems((prev) => ({
            ...prev,
            [item]: !prev[item],
        }));
    };

    return (
        <div>
            <h2>Printer Setup Checklist</h2>
            <ul>
                {items.map((item) => (
                    <li key={item}>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!checkedItems[item]}
                                onChange={() => handleCheck(item)}
                            />
                            {item}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checklist;