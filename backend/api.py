from flask import Flask, request, jsonify
from flask_cors import CORS
import io
from main import process_doc,detect_document_text,process_text

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

@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    try:
        print('before')
        params = request.get_json()
        print(params)
        if 'question' in params:
                 text = process_text(params['question'])
        else:
                text = process_text("")
        print('whet', type(text))
        result = {
            'message': text,
        }
        return jsonify({'response': result})
        return text, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
