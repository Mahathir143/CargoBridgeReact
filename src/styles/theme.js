import appConfig from '../config/appConfig';

const setThemeVariables = () => {
    document.documentElement.style.setProperty('--primary-color', appConfig.ui.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', appConfig.ui.colors.secondary);
    document.documentElement.style.setProperty('--text-color', appConfig.ui.colors.text);
};

export default setThemeVariables;