
path = r"c:\Users\aeadi\Desktop\mone-demo.vercel.app\_next\static\chunks\pages\_app-a6eeb0521308501a.js"
out_path = r"c:\Users\aeadi\Desktop\mone-demo-react\formatted_app.js"

try:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Simple formatting: insert newlines after braces and function keywords
    formatted = content.replace("function", "\nfunction").replace("},", "},\n").replace(";", ";\n")
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(formatted)
        
    print(f"Formatted file written to {out_path}")
    
except Exception as e:
    print(f"Error: {e}")
