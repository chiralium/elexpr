export const makeAction = (moduleName: string, actionList: Record<string, string>): Record<string, string> => {
    const actionNameList = Object.keys(actionList);

    return actionNameList.reduce((acc, actionName) => {
        return {
            [actionName]: `${moduleName}_${actionName}`
        }
    }, {});
}
