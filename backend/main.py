
import pypdfium2 as pdfium
import io
from PIL import Image
# from google.cloud import vision
from config import load_config
import ast
from openai import OpenAI

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
AMOUNT-$328.73
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
    print('something is here')
    response = process_text(cont_str)
    return response

def process_text(text):
  
  config = load_config()
  print('I am in gpt')
  print(config)
  client = OpenAI(api_key=config)
  print('I am after client')
  completion = client.chat.completions.create(
    model="gpt-4",
    messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Make a python dictionary object based on below scraped data. Data is not perfect, use your knowlegde while creating dictionary. the dictionary should have Transaction date, Merchant, Category, Amount. Try to extract a meaningful name for Merchant. Just give dictionary data, dont include anything else like clauses or notes in your response.\n\n{}".format(text)}
    ]
  )
  print(completion.choices[0].message.content)
  transactions_response_string = completion.choices[0].message.content

  try:
        response_dict = ast.literal_eval(transactions_response_string)
        print('dict after')
        print(response_dict)
  except ValueError:
        print("Error: Response is not a valid Python dictionary")
        return None
  return response_dict

def process_nextQ(text):
  
  config = load_config()
  print('I am in gpt')
  print(config)
  client = OpenAI(api_key=config)
  print('I am after client')
  completion = client.chat.completions.create(
    model="gpt-4",
    messages=[
      {"role": "user", "content": "when was the transaction done at Tommy Hilfiger"}
    ]
  )
  print(completion.choices[0].message.content)
  transactions_response_string = completion.choices[0].message.content

  try:
        response_dict = ast.literal_eval(transactions_response_string)
        print('dict after')
        print(response_dict)
  except ValueError:
        print("Error: Response is not a valid Python dictionary")
        return None
  return response_dict
