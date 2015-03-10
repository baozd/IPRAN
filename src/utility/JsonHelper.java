package utility;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;


/** 
 * JsonHelper
 */  
public class JsonHelper {  

    /** 
     * Xml2JsonFromString
     */
    public static  String Xml2JsonFromString(String xml) {  
        JSONObject obj = new JSONObject();  
        try {  
            InputStream is = new ByteArrayInputStream(xml.getBytes("utf-8"));  
            SAXReader saxReader = new SAXReader();  
            Document doc = saxReader.read(is);  
            Element root = doc.getRootElement();  
            obj.put(root.getName(), IterateElement(root));  
            return obj.toString();  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    }  
    
    /** 
     * Xml2JsonFromFile 
     */  
    public static String Xml2JsonFromFile(File file) {  
    	JSONObject obj = new JSONObject();  
        try { 
            SAXReader saxReader = new SAXReader();  
            Document doc = saxReader.read(file);  
            Element root = doc.getRootElement();  
            obj.put(root.getName(), IterateElement(root));  
            return obj.toString();  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        } 
    }    

	/** 
     * CreateXmlByDataTable 
     */
    public static String CreateXmlByDataTable(String tableName) {
        Document document = DocumentHelper.createDocument();
        // Root
        Element root = document.addElement(tableName);
        
        // Result Statues
        AddResultElement(root, 1, "");
                
        // Table Column Define
        AddTableDefineElement(root, 5);

        // Table Data Values
        AddDataResultsElement(root, 1000);
        
        return XmlDoc2String(document);  
    }

	/** 
     * AddResultElement 
     */
	private static void AddResultElement(Element parentElement, int statuesCode, String msgInfo) {
    	
    	if (parentElement == null)
    	{
    		return;
    	}
    	
    	Element result = DocumentHelper.createElement("Result");
    	Element statues = result.addElement("Statues");
        statues.setText("" + statuesCode);
        Element msg = result.addElement("Message");
    	
        if (msgInfo != null && !msgInfo.trim().isEmpty()) {
        	msg.setText(msgInfo);
        }
    	parentElement.add(result);
    }
    
    /** 
     * AddTableDefineElement 
     */
	private static void AddTableDefineElement(Element parentElement, int count) {
    	
    	if (parentElement == null)
    	{
    		return;
    	}
    	
    	Element tableDefine = DocumentHelper.createElement("TableDefine");
    	// Column Count
    	tableDefine.addAttribute("ColumnCount", String.valueOf(count));
    	
    	// Column Info
    	AddColumnElement(tableDefine, "aaa", "string", 10, 0, true, false);
    	AddColumnElement(tableDefine, "bbb", "int", 0, 0, true, false);
    	AddColumnElement(tableDefine, "ccc", "decimal", 0, 2,true, false);
    	AddColumnElement(tableDefine, "ddd", "decimal", 0, 2, true, false);
    	AddColumnElement(tableDefine, "eee", "decimal", 0, 2, false, true);
    	
    	parentElement.add(tableDefine);
    }
    
    /** 
     * AddDataResultsElement 
     */
	private static void AddDataResultsElement(Element parentElement, int dataCount) {
    	
    	if (parentElement == null)
    	{
    		return;
    	}
    	
    	Element dataResults = DocumentHelper.createElement("DataResults");
    	
    	for(int i = 0; i < dataCount; i++) {
    		AddDataValueElement(dataResults);
    	}
    	
    	parentElement.add(dataResults);
    }
    
    /** 
     * AddDataValueElement 
     */
	private static void AddDataValueElement(Element parentElement) {
    	
    	if (parentElement == null)
    	{
    		return;
    	}
    	
    	Element value = DocumentHelper.createElement("Value");
    	
    	// Set Data Value
    	AddDataValueElement(value, "aaa", "TextValues");
    	AddDataValueElement(value, "bbb", "2");
    	AddDataValueElement(value, "ccc", "2.12");
    	AddDataValueElement(value, "ddd", "3.25");
    	AddDataValueElement(value, "eee");
    	
    	parentElement.add(value);
    }
    
    /** 
     * AddDataValueElement 
     */
	private static void AddDataValueElement(Element parentElement, String name) {
    	
    	AddDataValueElement(parentElement, name, "");
    }
    
    /** 
     * AddDataValueElement 
     */
	private static void AddDataValueElement(Element parentElement, String name, String value) {
    	
    	AddDataValueElement(parentElement, name, value, "");
    }
    
    /** 
     * AddDataValueElement 
     */
	private static void AddDataValueElement(Element parentElement, String name, String value, String comment) {
    	
    	if (parentElement == null)
    	{
    		return;
    	}
    	
    	Element dataValue = DocumentHelper.createElement(name);
    	if (value != null && !value.trim().isEmpty()) {
    		dataValue.setText(value);	
    	}
    	if (comment != null && !comment.trim().isEmpty()) {
    		dataValue.addAttribute("comment", comment);	
    	}
    	parentElement.add(dataValue);
    }
    
    /** 
     * AddColumnElement 
     */
	private static void AddColumnElement(Element parentElement, String name, String type, int maxLen, int decimalLen, boolean mustFlag, boolean formulaFlag) {
    	
    	if (parentElement == null)
    	{
    		return;
    	}
    	
    	if (name == null || name.trim().isEmpty()) {
    		return;
    	}
    	
    	// Column Name
    	Element column = DocumentHelper.createElement(name);    	
    	// Type
    	if (type != null && !type.trim().isEmpty()) {
    		column.addAttribute("Type", type);
    	}
    	// Max Length
    	if (maxLen > 0) {
    		column.addAttribute("MaxLen", String.valueOf(maxLen));	
    	}
    	// decimal Length
    	if (type != null && type.trim().equalsIgnoreCase("decimal")) {
    		if (decimalLen > 0) {
        		column.addAttribute("DecimalLen", String.valueOf(decimalLen));	
        	} else {
        		column.addAttribute("DecimalLen", "0");
        	}
    	}
    	
    	// mustFlag
    	if (mustFlag) {
    		column.addAttribute("MustFlag", String.valueOf(mustFlag));
    	}
    	// formulaFlag
    	if (formulaFlag) {
    		column.addAttribute("FormulaFlag", String.valueOf(formulaFlag));
    	}
    
    	parentElement.add(column);
    }

	/** 
     * IterateElement
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	private static Map IterateElement(Element element) {  
        List jiedian = element.elements();  
        Element et = null;  
        Map obj = new HashMap();  
        List list = null;  
        for (int i = 0; i < jiedian.size(); i++) {  
            list = new LinkedList();  
            et = (Element) jiedian.get(i);  
            if (et.getTextTrim().equals("")) {  
                if (et.elements().size() == 0)  
                    continue;  
                if (obj.containsKey(et.getName())) {  
                    list = (List) obj.get(et.getName());  
                }  
                list.add(IterateElement(et));  
                obj.put(et.getName(), list);  
            } else {  
                if (obj.containsKey(et.getName())) {  
                    list = (List) obj.get(et.getName());  
                }  
                list.add(et.getTextTrim());  
                obj.put(et.getName(), list);
            }  
        }  
        return obj;  
    }

    /** 
     * XmlDoc2String
     */  
    private static String XmlDoc2String(Document document) {  
        String s = "";  
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();  
            OutputFormat format = new OutputFormat("   ", true, "UTF-8");  
            XMLWriter writer = new XMLWriter(out, format);  
            writer.write(document);  
            s = out.toString("UTF-8");  
        } catch (Exception ex) {  
            ex.printStackTrace();
        }  
        return s;  
    }    
}