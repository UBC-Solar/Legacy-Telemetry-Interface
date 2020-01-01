# -*- coding: utf-8 -*-
"""
Script to receive data from a COM port and HTTP POST it
"""

import requests

data = {}
data['id'] = 0x624
data['data'] = [0x00, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
data['timestamp'] = 500;

r = requests.post('http://localhost:8080', json=data)

print(r.status_code);