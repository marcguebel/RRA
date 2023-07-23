class Tool {
    static cleanParameter(param) {
        if (!param) 
            return '';
        return param.replace(/^['"`]|['"`]$/g, '');
    }
}

module.exports = Tool;