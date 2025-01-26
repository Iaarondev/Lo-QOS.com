#!/bin/bash

# Array of files to convert
files=(
  "assets/js/state-observable.js"
  "assets/js/entanglement-manager.js"
  "assets/js/performance-monitor.js"
  "assets/js/game-engine.js"
  "assets/js/complex.js"
  "assets/js/theme-manager.js"
  "assets/js/quantum-emulation.js"
  "assets/js/protocol.js"
  "assets/js/quantum-system.js"
  "assets/js/quantum-gates.js"
)

# Convert default exports to named exports
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    # Replace 'export default class' with 'export class'
    sed -i.bak 's/export default class/export class/g' "$file"
    
    # Update references in other files
    class_name=$(basename "$file" .js | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' | sed 's/ //g')
    sed -i.bak "s/import ${class_name} from/import { ${class_name} } from/g" assets/js/*.js
    
    echo "✅ Converted $file to named exports"
  else
    echo "⚠️  File not found: $file"
  fi
done

echo "🚀 All files converted to named exports"