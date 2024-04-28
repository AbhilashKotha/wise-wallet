from configparser import ConfigParser

def load_config(filename='config.ini', section='settings'):

    # Read the content from the INI file
    config = ConfigParser()
    config.read(filename)

    # Get the content value
    api = config['settings']['api']
    # Print the content
    print('api',api)

    return api

if __name__ == '__main__':
    config = load_config()