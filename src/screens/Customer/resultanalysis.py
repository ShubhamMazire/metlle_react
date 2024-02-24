# Import pandas 
import pandas as pd 
data=pd.read_csv('max.csv')
keys=data.keys()
#print(keys[0])  

#print(data["Seat_number"][:10])

for subject in keys[2::3]:
#LP1_TW_GRADE	LP1_TW_CP	LP1_PR_MARKS	LP1_PR_GRADE	LP1_PR_CP	LP2_TW_MARKS	LP2_TW_GRADE	LP2_TW_CP	LP2_OR_MARKS	LP2_OR_GRADE	LP2_OR_CP	PROJECT1_OR_MARKS	PROJECT_OR_GRADE	PROJECT_OR_CP	SGPA

	print()
	print("--------------------------------------------------")
	
	print("===========  "+subject+"===================")
	
	print("top 5 as per "+subject)
	final_df = data.sort_values(by=[subject], ascending=False)
	count=1;
	last=100
	fail_in_current_subject=0
	top_5=[]
	for ind in final_df.index:
		marks=float(final_df[subject][ind])
		#print(marks,"<" ,last) 


		if(count<6):
			top_5.append([final_df['Seat_number'][ind], final_df['Name of The Student'][ind],final_df[subject][ind]])
		if(marks<last):
			count+=1
			last=marks
		if(final_df[subject.replace("MARKS","")+"GRADES"][ind]=="F"):
			fail_in_current_subject+=1
			
		
		
	while(len(top_5)>5):
		remove=top_5[-1][-1]
		for i in range(len(top_5)):
			if(top_5[-1][-1]==remove):
				top_5.pop();
	for k in top_5:
		print(k)
	
	print("Total Fail = ",fail_in_current_subject)
	print("Total PASS = ",len(final_df['Seat_number'])-fail_in_current_subject)
	#Pass Percentage of Each subject [ Hint : Total Number of Passed Students of each Subject/Total Number of Failed Students of each Subject]
	
	print("Pass Students =",(100/len(final_df['Seat_number']))*(len(final_df['Seat_number'])-fail_in_current_subject)," %");