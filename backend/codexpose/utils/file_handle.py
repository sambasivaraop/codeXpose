import sys
import configparser
import logging
""" 
This Module reads the code written by the candidate from 
candidate_answer.txt file and executes it.
Also captures the exception while executing the code.
Exception captured will be written to display_output.txt file through shell 
commands.
"""
LOGGER = logging.getLogger(__name__)
log_handle = logging.StreamHandler(sys.stdout)
log_handle.setLevel(logging.ERROR)

CONFIG_PATH = "/src/config.ini"
config = configparser.ConfigParser()
config.read(CONFIG_PATH)

try:
    with open('/src/'+config['file']['answer_file']) as f:
        code = f.read()
    compile_code = compile(code, config['file']['answer_file'], 'exec')
    exec(compile_code)
except Exception as e:
    message = "%s: %s" % (str(sys.exc_info()[0].__name__),
                          str(sys.exc_info()[1:2][0]))
    log_handle.setFormatter(logging.Formatter('%(message)s'))
    LOGGER.addHandler(log_handle)
    LOGGER.error(message)


