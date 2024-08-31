import React from 'react';

// @todo: vk - replace instances of Loader with ThemeLoader
// set default props to use theme variables
const defaultParams = {
    type: 'ThreeDots',
    color: '#2BAD60',
    height: 100,
    width: 100,
    customClass: 'default-loader'
}

const ThemeLoader = (props) => (
    <div className={`container-fluid theme-loader ${props.customClass || defaultParams.customClass}`}>
    </div>
)

export default ThemeLoader;
