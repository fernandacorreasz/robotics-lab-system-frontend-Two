import React from 'react';
import { Cascader, ConfigProvider } from 'antd';
import type { GetProp, CascaderProps } from 'antd';
import { Theme } from '../../styles/ThemeComponent';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface CascaderComponentProps {
    options?: { value: string; label: string }[];
    onChange: (value: string[] | undefined) => void; 
    value?: string[];
    styles?: React.CSSProperties | undefined; 
}

const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some((option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

const CascaderComponent: React.FC<CascaderComponentProps> = ({
    options,
    onChange,
    value,
    styles,
}) => {
    return (
        <ConfigProvider theme={Theme}>
            <Cascader
                options={options}
                onChange={onChange}
                placeholder="Please select"
                showSearch={{ filter }}
                defaultValue={value}
                style={styles}
            />
        </ConfigProvider>
    );
};

export default CascaderComponent;
