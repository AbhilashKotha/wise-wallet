
import pypdfium2 as pdfium
import io
from PIL import Image
# from google.cloud import vision
from config import load_config
import ast
from openai import OpenAI
import json
livefile = open('live-data.json')
statcifile = open('file-data.json')
file_data_conversation = []
live_data_conversation = []
liveDataFromJSON = json.load(livefile)
fileDataFromJSON = json.load(statcifile)
statcifile.close()
livefile.close()

def process_doc(doc):
  pdf = pdfium.PdfDocument(doc)

  print(len(pdf))

  image = pdf[2].render(scale=4).to_pil()
  w, h = image.size
  ratio_l = 0.05
  ratio_t = 0.1
  ratio_b =0.1
  ratio_r = 0.33

  left = w * ratio_l
  upper = h * ratio_t
  right = w - w*ratio_r
  lower = h - w*ratio_b

  image = image.crop((left, upper, right, lower))
  # image.show()

  byte_io = io.BytesIO()
  image.save(byte_io, format='JPEG')  
  content = byte_io.getvalue()

  detect_document_text(content)

def detect_document_text(content):

    cont_str = """
Transactions
TRANS.
DATE
PAYMENTSANDCREDITS
03/03
INTERNETPAYMENT-THANKYOU
AMOUNT$328.73
TRANS.
DATE
PURCHASES
MERCHANTCATEGORY
AMOUNT
02/04HOLLISTER#31393QUILCEDAVLGWA
Merchandise
$13.20
02/04
COLUMBIA419CHESTERFIELDMO
Merchandise
$18.69
02/04
TOMMYHILFIGERNEWYORKNY
Merchandise
$37.96
02/07MASABIMETROSTL314-982-1406MO
Travel/Entertainment
$1.00
PUJ56VMBSCHNN3S
02/14
408FOUNDRYSTLOUISMO
01462R
Supermarkets
$59.26
HULU877-8244858CA
02/28
02/29
03/02
408FOUNDRYSTLOUISMO00267R
02/26HULU877-8244858CAHULU.COM/BILLCA
SCHNUCKSLINDELLST.LOUISMO
CHATGPTSUBSCRIPTION4158799686CA
Services
$1.99
Supermarkets
$64.76
Merchandise
$20.00
Supermarkets
$43.52"""
    # chk = False
    # client = vision.ImageAnnotatorClient()
    # image = vision.Image(content=content)
    # response = client.document_text_detection(image=image)

    # for page in response.full_text_annotation.pages:
    #     print(len(page.blocks))
    #     print(page.blocks[0])
    #     for block in page.blocks:
    #         for paragraph in block.paragraphs:
    #             paragraph_text = ''.join([symbol.text for word in paragraph.words for symbol in word.symbols])
    #             if paragraph_text.lower() == "feesandinterestcharged":
    #                 chk = True
    #                 break
    #             cont_str+=paragraph_text
    #             cont_str+="\n"
    #         if chk:
    #           break
  
    # if response.error.message:
    #     raise Exception('{}\nFor more info on error messages, check: https://cloud.google.com/apis/design/errors'.format(response.error.message))
    return cont_str

def process_text(question,live):
  print('entered process_text')
  if live:
     dataToBeUsed = liveDataFromJSON
  else:
      print('in elsedata now')
      dataToBeUsed =  fileDataFromJSON
  messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "I will ask you some questions on the below data.Please answer factual questions only based on the data. If I ask projections or some suggestions, please use the historical transaction data for suggections. Let your answers be short and informative. First start by saying **Hi, How can I Help you**\n\n{}".format(dataToBeUsed)}
    ]
  config = load_config()
  print('I am in gpt')
  print(config)
  client = OpenAI(api_key=config)
  print('I am after client')
  global file_data_conversation
  global live_data_conversation

  if live:
     
    if len(live_data_conversation)==0:
        live_data_conversation = messages
    else:
        live_data_conversation.append({"role": "user", "content":"Here is the question on above data\n\n{}".format(question)})
    completion = client.chat.completions.create(
    model="gpt-4", 
    messages=live_data_conversation
    )
    live_data_conversation.append({"role":"assistant", "content":completion.choices[0].message.content})
    transactions_response_string = completion.choices[0].message.content
    return transactions_response_string
  else:
      if len(file_data_conversation)==0:
        file_data_conversation = messages
      else:
        file_data_conversation.append({"role": "user", "content":"Here is the question on above data\n\n{}".format(question)})
      completion = client.chat.completions.create(
      model="gpt-4", 
      messages=file_data_conversation
      )


      file_data_conversation.append({"role":"assistant", "content":completion.choices[0].message.content})
      transactions_response_string = completion.choices[0].message.content
      return transactions_response_string

def process_suggestions(budget, day,spent):
   

  dataToBeUsed = liveDataFromJSON
  prompts=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "I have a monthly budget of "+str(budget)+" dollars and I have already spent "+ str(spent) +" by day"+str(day)+" of the month. Can you give me only  3 suggestions on where  and how much to cut my expenses and where to allocate more to be on track to be on track with  my budget? I also could use two links to learning resources like articles or videos. Please use my transaction list below to understand my spending patterns and suggest accordingly. I strictly want a python dictionary to be the output formart ***ex:"+ str() + ", no other text leading or trailing. \n\n{}".format(dataToBeUsed)}
    ]
  config = load_config()
  print('I am in gpt')
  print(config)
  client = OpenAI(api_key=config)
  print('I am after client')
  completion = client.chat.completions.create(
  model="gpt-4", 
  messages=prompts
    )
  transactions_response_string = completion.choices[0].message.content
  # return transactions_response_string
  try:
        response_dict = ast.literal_eval(transactions_response_string)
        print('dict after')
        print(response_dict)
        return response_dict
  except ValueError:
        print("Error: Response is not a valid Python dictionary")
        return None
  