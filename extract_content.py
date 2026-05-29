import re
import json

path = r"c:\Users\aeadi\Desktop\mone-demo.vercel.app\_next\static\chunks\pages\_app-a6eeb0521308501a.js"

def extract_obj(content, variable_name):
    # Regex to capture "let varName={...};" or "var varName={...};"
    # This is a naive regex, might need adjustment for nested braces
    # simple attempt: look for variable definition and grab everything until the next ";var " or ";let " or end of file
    
    # improved regex to find the start
    pattern = r"(?:let|var)\s+" + re.escape(variable_name) + r"\s*=\s*(\{)"
    match = re.search(pattern, content)
    
    if match:
        start_index = match.start(1)
        # simplistic brace counting to find the end
        brace_count = 0
        end_index = start_index
        for i in range(start_index, len(content)):
            char = content[i]
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_index = i + 1
                    break
        
        extracted = content[start_index:end_index]
        return extracted
    return None

try:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Mappings based on manual inspection of _app.js
    # Hero -> y
    # About -> E
    # Services -> b
    # Portfolio -> R
    # Awards -> N
    # Testimonials -> Q
    # Clients -> O
    
    mapping = {
        "Hero_Data": "y",
        "About_Data": "E",
        "Services_Data": "b",
        "Portfolio_Data": "R",
        "Awards_Data": "N",
        "Testimonial_Data": "Q",
        "Clients_Data": "O"
    }

    output_file = r"c:\Users\aeadi\Desktop\mone-demo-react\src\data.js"
    with open(output_file, 'w', encoding='utf-8') as outfile:
        outfile.write("export const extractedData = {\n")
        
        for name, var_name in mapping.items():
            data = extract_obj(content, var_name)
            if data:
                print(f"Extracted {name}")
                outfile.write(f"  {name}: {data},\n")
            else:
                print(f"FAILED to extract {name} (var {var_name})")
        
        outfile.write("};\n")

except Exception as e:
    print(f"Error: {e}")
