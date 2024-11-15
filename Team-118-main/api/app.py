from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

"""
when 'Trials' tab is pressed on app, we hit this endpoint
given the mrn as query we retrieve the necessary patient data from SHP
then do the documentdb search and return the relevant trials that populate the screen
ex. [base]/patients/trials?mrn=01
"""
@app.route('/patients/trials', methods=['GET'])
def get_trials():
    mrn = request.args.get('mrn')
    if mrn:
        # this is the meat of the program
        return mrn
    else:
        return "Invalid MRN", 400
    
"""
the rest of these would only be used if we have the researcher client set up
"""
@app.route('/researchers/post_trial', methods=['POST'])
def post_trial():
    pass

@app.route('/researchers/update_trial', methods=['PATCH'])
def update_trial():
    pass

@app.route('/researchers/delete_trial', methods=['DELETE'])
def delete_trial():
    pass

if __name__ == '__main__':
    app.run(debug=True)