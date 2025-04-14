from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable frontend access

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    try:
        # Read file into DataFrame
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)

        # Check required columns exist
        expected_columns = ['Date', 'Daily Output', 'Metal Yield']
        if not all(col in df.columns for col in expected_columns):
            return jsonify({'error': f'Missing columns. Expected: {expected_columns}'}), 400

        # Data validation and cleaning (like WIRE)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')  # Convert to datetime
        df['Daily Output'] = pd.to_numeric(df['Daily Output'], errors='coerce').fillna(0)
        df['Metal Yield'] = pd.to_numeric(df['Metal Yield'], errors='coerce').fillna(0)

        # Check if any rows are invalid after cleaning (NaT or NaN)
        df = df.dropna(subset=['Date', 'Daily Output', 'Metal Yield'])

        # Prepare response
        response = {
            'columns': df.columns.tolist(),
            'rows': len(df),
            'head': df.head(5).to_dict(orient='records')  # Preview first 5 rows
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
