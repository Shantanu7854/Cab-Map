from flask import Flask, request, jsonify
from flask_cors import CORS
from unalix import unshort_url
from urllib.parse import unquote
import requests
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app)  

# GEOCODING_API_KEY = os.getenv('GEOCODING_API_KEY')

# if not GEOCODING_API_KEY:
#     raise ValueError("GEOCODING_API_KEY is missing from environment variables.")

# Route for getting simple address
@app.route('/get-simple-address', methods=['POST'])
def get_simple_address():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    # Unshorten the URL
    try:
        full_url = unshort_url(url)
        if not full_url:
            return jsonify({'error': 'Unshortened URL is empty'}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to unshorten URL', 'details': str(e)}), 500

    # Extract address from the unshortened URL
    try:
        if "/place/" in full_url:
            address = full_url.split('/place/')[1].split('/')[0]
            address = unquote(address.replace('+', ' '))
            return jsonify({'address': address}), 200
        else:
            return jsonify({'error': 'No address found in the URL'}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to extract address from the URL', 'details': str(e)}), 500

# Route for getting detailed address (returns only lat/lng now)
@app.route('/get-detailed-address', methods=['POST'])
def get_detailed_address():
    data = request.get_json()
    shortened_url = data.get('url')

    if not shortened_url:
        return jsonify({'error': 'URL is required'}), 400

    # Unshorten the URL
    try:
        unshortened_url = unshort_url(shortened_url)
        if not unshortened_url:
            return jsonify({'error': 'Unshortened URL is empty'}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to unshorten URL', 'details': str(e)}), 500

    # Extract latitude and longitude from the URL
    try:
        if "/@" in unshortened_url:
            location = unshortened_url.split("/@")[1].split(",")[0:2]
            if len(location) < 2:
                return jsonify({'error': 'Invalid coordinates format'}), 400
            lat, lng = location[0], location[1]
        else:
            return jsonify({'error': 'No coordinates found in the URL'}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to extract coordinates', 'details': str(e)}), 400

    # Google Maps Geocoding API logic is commented out
    """
    geocode_url = f'https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={GEOCODING_API_KEY}'
    response = requests.get(geocode_url)

    if response.status_code == 200:
        results = response.json().get('results', [])
        if not results:
            return jsonify({'error': 'No address found for given coordinates'}), 400

        address = results[0].get('formatted_address', 'Address not found')
        return jsonify({'address': address, 'lat': lat, 'lng': lng}), 200
    else:
        return jsonify({'error': 'Failed to fetch address from Geocoding API'}), 500
    """

    return jsonify({
        'lat': lat,
        'lng': lng,
        'note': 'Google Maps Geocoding API is disabled.'
    }), 200

if __name__ == '__main__':
    app.run(debug=True)



# code 1
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from unalix import unshort_url
# import requests
# import os
# from dotenv import load_dotenv

# # Load environment variables from the .env file
# load_dotenv()

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Get the API key from the environment variables
# GEOCODING_API_KEY = os.getenv('GEOCODING_API_KEY')

# @app.route('/get-address', methods=['POST'])
# def get_address():
#     data = request.get_json()
#     shortened_url = data.get('url')

#     if not shortened_url:
#         return jsonify({'error': 'URL is required'}), 400

#     # Unshorten the URL
#     try:
#         unshortened_url = unshort_url(shortened_url)
#     except Exception as e:
#         return jsonify({'error': 'Failed to unshorten URL', 'details': str(e)}), 500

#     # Extract latitude and longitude from unshortened Google Maps URL
#     try:
#         location = unshortened_url.split("/@")[1].split(",")[0:2]
#         lat, lng = location[0], location[1]
#     except Exception as e:
#         return jsonify({'error': 'Failed to extract coordinates', 'details': str(e)}), 400

#     # Make a request to the Geocoding API to get the address
#     geocode_url = f'https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={GEOCODING_API_KEY}'
#     response = requests.get(geocode_url)

#     if response.status_code == 200:
#         address = response.json()['results'][0]['formatted_address']
#         return jsonify({'address': address}), 200
#     else:
#         return jsonify({'error': 'Failed to fetch address from Geocoding API'}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

# code 2
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from unalix import unshort_url
# from urllib.parse import unquote

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# @app.route('/get-address', methods=['POST'])
# def get_address():
#     data = request.get_json()
#     url = data.get('url')

#     if not url:
#         return jsonify({'error': 'No URL provided'}), 400

#     # Step 1: Unshorten the URL
#     try:
#         full_url = unshort_url(url)
#     except Exception as e:
#         return jsonify({'error': 'Failed to unshorten URL'}), 500

#     # Step 2: Extract address from the unshortened URL (if present)
#     try:
#         if "/place/" in full_url:
#             # The address comes after '/place/' and ends before the next '/'
#             address = full_url.split('/place/')[1].split('/')[0]

#             # Step 3: Decode the URL encoding to make it human-readable
#             address = unquote(address.replace('+', ' '))

#             return jsonify({'address': address}), 200
#         else:
#             return jsonify({'error': 'No address found in the URL'}), 400
#     except Exception as e:
#         return jsonify({'error': 'Failed to extract address from the URL'}), 500


# if __name__ == '__main__':
#     app.run(debug=True)



