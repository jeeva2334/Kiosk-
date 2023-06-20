from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
from time import *
import json

app = Flask(__name__)
CORS(app)

items = {}

@app.route('/print', methods=['POST'])
def print_message():
    resp = request.get_json()
    print(resp)
    timeout = 10  # Timeout in seconds
    start_time = time()
    while (time() - start_time) < timeout:
        print("reading ....")
        sleep(1)
    print("done id is: blaa blaa blaa ........")
    items = resp['items']
    total = resp['total']
    
    print("KGiSL KIOSK PROJECT")
    print("ITEMS")
    print("====================")
    print("Items Quantity Total")
    
    for item in items:
        name = item['name']
        quantity = int(item['quantity'])
        price = int(item['price'])
        item_total = quantity * price
        
        print(f"{name} x {quantity} = {item_total}")
    
    print("====================")
    print("Total amount ->", total)
    return {"message":"Succesful"}

@app.route('/read_card')
def read_card():
    items = request.args.get('res')
    print(items)
    timeout = 10  # Timeout in seconds
    start_time = time()
    while (time() - start_time) < timeout:
        print("reading ....")
        sleep(1)
    print("done id is: blaa blaa blaa ........")
    return redirect(url_for('printRes',res=items))

@app.route('/printe_receipt')
def printRes():
    items_str = request.args.get('res')
    items_str = items_str.replace("'", '"')
    items = json.loads(items_str)
    
    item_list = items['items']
    total = items['total']
    
    print("KGiSL KIOSK PROJECT")
    print("ITEMS")
    print("====================")
    print("Items Quantity Total")
    
    for item in item_list:
        name = item['name']
        quantity = int(item['quantity'])
        price = int(item['price'])
        item_total = quantity * price
        
        print(f"{name} x {quantity} = {item_total}")
    
    print("====================")
    print("Total amount ->", total)
    return redirect("http://localhost:5173/menu/thankyou")

if __name__ == '__main__':
    app.run(debug=True)
