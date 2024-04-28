from flask import Flask, request, jsonify
from flask_cors import CORS
import io
from main import process_doc,detect_document_text,process_text,process_suggestions
import json
from datetime import datetime, timedelta 

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000', '*'])
@app.route('/', methods=['GET'])
def home():
       
    try:
        result = {
            'message': 'Testing flask'
        }
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No PDF file part'}), 400

    file = request.files['pdf']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:     
        process_doc(file.filename)
        result = {
            'message': 'PDF processed successfully',
        }
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_suggestions', methods=['POST'])
def get_suggestions():
        params = request.get_json()
        # text = process_suggestions(params['budget'],params['day'],params['spent'])
        import json
        f = open('suggestions.json')
        dataOut = json.load(f)
        f.close()
        return jsonify(dataOut)

@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    try:
        print('before')
        params = request.get_json()
        print(params)
        text=""
        if 'live' in params and params['live']:
            if 'question' in params:
                    text = process_text(params['question'],True)
            else:
                    text = process_text("")
            print('********in if*****')
        else:
            if 'question' in params:
                    text = process_text(params['question'],False)
            else:
                    text = process_text("")
            print('********in else*****')
        result = {
            'message': text,
        }
        return jsonify({'response': result})
        return text, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

with open('./test-data/monthly-data.json') as personal_expenses:
    monthly_data = json.load(personal_expenses)
    # print("data", monthly_data)

with open('./test-data/mock-groups-data.json') as group_data:
  groups_data = json.load(group_data)
#   print("groups data", groups_data)

def get_past_three_months(current_date):
    months = []
    for i in range(1, 4):
        past_month = current_date - timedelta(days=(i * 30))  # Use timedelta here
        months.append(past_month.strftime("%B"))
    return months

@app.route('/personal_data/<month>', methods=['GET'])
def get_personal_data(month):
    """
    API endpoint to retrieve personal data for a specific month.

    Args:
        month (str): The month for which data is requested.

    Returns:
        JSON: A JSON object containing total budget, total spent, and expense data.
    """
    if month not in monthly_data:
        return jsonify({'error': 'Invalid month'}), 400

    data = monthly_data[month]
    past_three_months = get_past_three_months(datetime.now())  # Use datetime.now() directly

    return jsonify({
        'totalBudget': data['totalBudget'],
        'totalSpent': data['totalSpent'],
        'expenseData': data['expenseData'],
    })

@app.route('/groups',methods=['GET'])
def get_group_names():
    #group_names = [group['name'] for group in groups_data]
    return jsonify(groups_data)

if __name__ == '__main__':
    app.run(debug=True)
