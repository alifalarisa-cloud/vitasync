
const vitaData = {
  "supplements": [
    {
      "id": "supp_1",
      "name": "Vitamin A",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Supports vision, immune system, and skin health.",
      "instructions": "Take 1 softgel daily with a fat-containing meal.",
      "warnings": "Do not exceed recommended dose. Excess Vitamin A can be toxic."
    },
    {
      "id": "supp_2",
      "name": "Vitamin C",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Powerful antioxidant supporting immune function and collagen synthesis.",
      "instructions": "Take 1-2 tablets daily with water, preferably in the morning.",
      "warnings": "High doses may cause mild stomach upset or diarrhea."
    },
    {
      "id": "supp_3",
      "name": "Vitamin D3",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Essential for calcium absorption, bone strength, and immune regulation.",
      "instructions": "Take 1 capsule daily with a meal containing healthy fats.",
      "warnings": "Monitor blood levels regularly if taking high doses."
    },
    {
      "id": "supp_4",
      "name": "Vitamin E",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Fat-soluble antioxidant that protects cell membranes from oxidative damage.",
      "instructions": "Take 1 capsule daily with dinner.",
      "warnings": "May interact with blood thinning medications."
    },
    {
      "id": "supp_5",
      "name": "Vitamin K1",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Primary vitamin involved in blood coagulation and cardiovascular health.",
      "instructions": "Take 1 tablet daily with food.",
      "warnings": "Consult a doctor if you are taking blood thinners like Warfarin."
    },
    {
      "id": "supp_6",
      "name": "Vitamin K2",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Directs calcium to bones and teeth, preventing arterial calcification.",
      "instructions": "Take 1 capsule daily alongside Vitamin D3.",
      "warnings": "Consult a physician if on anticoagulant therapy."
    },
    {
      "id": "supp_7",
      "name": "Vitamin B1 (Thiamine)",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Crucial for energy metabolism and nervous system function.",
      "instructions": "Take 1 capsule daily with breakfast.",
      "warnings": "None reported at standard dietary levels."
    },
    {
      "id": "supp_8",
      "name": "Vitamin B2 (Riboflavin)",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Supports cellular energy production and maintains healthy skin and eyes.",
      "instructions": "Take 1 capsule daily. May cause harmless bright yellow urine.",
      "warnings": "None reported."
    },
    {
      "id": "supp_9",
      "name": "Vitamin B3 (Niacin)",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Supports cardiovascular health and cellular repair processes.",
      "instructions": "Take 1 tablet daily. May cause temporary Niacin Flush.",
      "warnings": "Consult a doctor if you have liver disease or gout."
    },
    {
      "id": "supp_10",
      "name": "Vitamin B5",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Critical for hormone production and fatty acid synthesis.",
      "instructions": "Take 1 capsule daily with water.",
      "warnings": "None reported."
    },
    {
      "id": "supp_11",
      "name": "Vitamin B6",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Involved in neurotransmitter synthesis and protein metabolism.",
      "instructions": "Take 1 capsule daily.",
      "warnings": "Long-term high doses can lead to temporary nerve sensitivity."
    },
    {
      "id": "supp_12",
      "name": "Vitamin B7 (Biotin)",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Promotes healthy hair, glowing skin, and strong nails.",
      "instructions": "Take 1 capsule daily with a meal.",
      "warnings": "May interfere with certain laboratory blood tests."
    },
    {
      "id": "supp_13",
      "name": "Vitamin B9 (Folate)",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Essential for DNA synthesis, cell division, and prenatal development.",
      "instructions": "Take 1 capsule daily. L-Methylfolate form is preferred.",
      "warnings": "High levels can mask a Vitamin B12 deficiency."
    },
    {
      "id": "supp_14",
      "name": "Vitamin B12",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Supports nerve function, brain health, and red blood cell production.",
      "instructions": "Take 1 sublingual tablet daily on an empty stomach.",
      "warnings": "None reported."
    },
    {
      "id": "supp_15",
      "name": "Vitamin A Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Supports vision, immune system, and skin health.",
      "instructions": "Take 1 softgel daily with a fat-containing meal.",
      "warnings": "Do not exceed recommended dose. Excess Vitamin A can be toxic."
    },
    {
      "id": "supp_16",
      "name": "Vitamin C Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Powerful antioxidant supporting immune function and collagen synthesis.",
      "instructions": "Take 1-2 tablets daily with water, preferably in the morning.",
      "warnings": "High doses may cause mild stomach upset or diarrhea."
    },
    {
      "id": "supp_17",
      "name": "Vitamin D3 Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Essential for calcium absorption, bone strength, and immune regulation.",
      "instructions": "Take 1 capsule daily with a meal containing healthy fats.",
      "warnings": "Monitor blood levels regularly if taking high doses."
    },
    {
      "id": "supp_18",
      "name": "Vitamin E Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Fat-soluble antioxidant that protects cell membranes from oxidative damage.",
      "instructions": "Take 1 capsule daily with dinner.",
      "warnings": "May interact with blood thinning medications."
    },
    {
      "id": "supp_19",
      "name": "Vitamin K1 Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Primary vitamin involved in blood coagulation and cardiovascular health.",
      "instructions": "Take 1 tablet daily with food.",
      "warnings": "Consult a doctor if you are taking blood thinners like Warfarin."
    },
    {
      "id": "supp_20",
      "name": "Vitamin K2 Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Directs calcium to bones and teeth, preventing arterial calcification.",
      "instructions": "Take 1 capsule daily alongside Vitamin D3.",
      "warnings": "Consult a physician if on anticoagulant therapy."
    },
    {
      "id": "supp_21",
      "name": "Vitamin B1 (Thiamine) Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Crucial for energy metabolism and nervous system function.",
      "instructions": "Take 1 capsule daily with breakfast.",
      "warnings": "None reported at standard dietary levels."
    },
    {
      "id": "supp_22",
      "name": "Vitamin B2 (Riboflavin) Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Supports cellular energy production and maintains healthy skin and eyes.",
      "instructions": "Take 1 capsule daily. May cause harmless bright yellow urine.",
      "warnings": "None reported."
    },
    {
      "id": "supp_23",
      "name": "Vitamin B3 (Niacin) Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Supports cardiovascular health and cellular repair processes.",
      "instructions": "Take 1 tablet daily. May cause temporary Niacin Flush.",
      "warnings": "Consult a doctor if you have liver disease or gout."
    },
    {
      "id": "supp_24",
      "name": "Vitamin B5 Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Critical for hormone production and fatty acid synthesis.",
      "instructions": "Take 1 capsule daily with water.",
      "warnings": "None reported."
    },
    {
      "id": "supp_25",
      "name": "Vitamin B6 Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Involved in neurotransmitter synthesis and protein metabolism.",
      "instructions": "Take 1 capsule daily.",
      "warnings": "Long-term high doses can lead to temporary nerve sensitivity."
    },
    {
      "id": "supp_26",
      "name": "Vitamin B7 (Biotin) Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Promotes healthy hair, glowing skin, and strong nails.",
      "instructions": "Take 1 capsule daily with a meal.",
      "warnings": "May interfere with certain laboratory blood tests."
    },
    {
      "id": "supp_27",
      "name": "Vitamin B9 (Folate) Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Essential for DNA synthesis, cell division, and prenatal development.",
      "instructions": "Take 1 capsule daily. L-Methylfolate form is preferred.",
      "warnings": "High levels can mask a Vitamin B12 deficiency."
    },
    {
      "id": "supp_28",
      "name": "Vitamin B12 Extra Strength Gen 2",
      "category": "Vitamin",
      "dose": "250 mg",
      "description": "Supports nerve function, brain health, and red blood cell production.",
      "instructions": "Take 1 sublingual tablet daily on an empty stomach.",
      "warnings": "None reported."
    },
    {
      "id": "supp_29",
      "name": "Vitamin A Extra Strength Gen 3",
      "category": "Vitamin",
      "dose": "500 mg",
      "description": "Supports vision, immune system, and skin health.",
      "instructions": "Take 1 softgel daily with a fat-containing meal.",
      "warnings": "Do not exceed recommended dose. Excess Vitamin A can be toxic."
    },
    {
      "id": "supp_30",
      "name": "Vitamin C Extra Strength Gen 3",
      "category": "Vitamin",
      "dose": "750 mg",
      "description": "Powerful antioxidant supporting immune function and collagen synthesis.",
      "instructions": "Take 1-2 tablets daily with water, preferably in the morning.",
      "warnings": "High doses may cause mild stomach upset or diarrhea."
    },
    {
      "id": "supp_31",
      "name": "Magnesium Glycinate",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Highly bioavailable magnesium for muscle relaxation, sleep, and nerve health.",
      "instructions": "Take 2 capsules before bedtime with water.",
      "warnings": "May cause loose stools if taken in excess."
    },
    {
      "id": "supp_32",
      "name": "Zinc Picolinate",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Essential mineral for immune defense, testosterone production, and skin healing.",
      "instructions": "Take 1 capsule daily with a hearty meal.",
      "warnings": "Never take on an empty stomach; can cause severe nausea."
    },
    {
      "id": "supp_33",
      "name": "Iron Bisglycinate",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Gentle iron formulation to prevent anemia without causing constipation.",
      "instructions": "Take 1 capsule daily on an empty stomach with Vitamin C.",
      "warnings": "Keep out of reach of children. Do not take with coffee or tea."
    },
    {
      "id": "supp_34",
      "name": "Calcium Carbonate",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Supports bone structure, dental strength, and muscle function.",
      "instructions": "Take 1 tablet twice daily with food.",
      "warnings": "Do not take alongside Iron; inhibits absorption."
    },
    {
      "id": "supp_35",
      "name": "Potassium Citrate",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Supports healthy blood pressure, fluid balance, and kidney function.",
      "instructions": "Take 1 capsule daily with food.",
      "warnings": "Avoid if you have kidney disease or take ACE inhibitors."
    },
    {
      "id": "supp_36",
      "name": "Magnesium Glycinate Extra Strength Gen 2",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Highly bioavailable magnesium for muscle relaxation, sleep, and nerve health.",
      "instructions": "Take 2 capsules before bedtime with water.",
      "warnings": "May cause loose stools if taken in excess."
    },
    {
      "id": "supp_37",
      "name": "Zinc Picolinate Extra Strength Gen 2",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Essential mineral for immune defense, testosterone production, and skin healing.",
      "instructions": "Take 1 capsule daily with a hearty meal.",
      "warnings": "Never take on an empty stomach; can cause severe nausea."
    },
    {
      "id": "supp_38",
      "name": "Iron Bisglycinate Extra Strength Gen 2",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Gentle iron formulation to prevent anemia without causing constipation.",
      "instructions": "Take 1 capsule daily on an empty stomach with Vitamin C.",
      "warnings": "Keep out of reach of children. Do not take with coffee or tea."
    },
    {
      "id": "supp_39",
      "name": "Calcium Carbonate Extra Strength Gen 2",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Supports bone structure, dental strength, and muscle function.",
      "instructions": "Take 1 tablet twice daily with food.",
      "warnings": "Do not take alongside Iron; inhibits absorption."
    },
    {
      "id": "supp_40",
      "name": "Potassium Citrate Extra Strength Gen 2",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Supports healthy blood pressure, fluid balance, and kidney function.",
      "instructions": "Take 1 capsule daily with food.",
      "warnings": "Avoid if you have kidney disease or take ACE inhibitors."
    },
    {
      "id": "supp_41",
      "name": "Magnesium Glycinate Extra Strength Gen 3",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Highly bioavailable magnesium for muscle relaxation, sleep, and nerve health.",
      "instructions": "Take 2 capsules before bedtime with water.",
      "warnings": "May cause loose stools if taken in excess."
    },
    {
      "id": "supp_42",
      "name": "Zinc Picolinate Extra Strength Gen 3",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Essential mineral for immune defense, testosterone production, and skin healing.",
      "instructions": "Take 1 capsule daily with a hearty meal.",
      "warnings": "Never take on an empty stomach; can cause severe nausea."
    },
    {
      "id": "supp_43",
      "name": "Iron Bisglycinate Extra Strength Gen 3",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Gentle iron formulation to prevent anemia without causing constipation.",
      "instructions": "Take 1 capsule daily on an empty stomach with Vitamin C.",
      "warnings": "Keep out of reach of children. Do not take with coffee or tea."
    },
    {
      "id": "supp_44",
      "name": "Calcium Carbonate Extra Strength Gen 3",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Supports bone structure, dental strength, and muscle function.",
      "instructions": "Take 1 tablet twice daily with food.",
      "warnings": "Do not take alongside Iron; inhibits absorption."
    },
    {
      "id": "supp_45",
      "name": "Potassium Citrate Extra Strength Gen 3",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Supports healthy blood pressure, fluid balance, and kidney function.",
      "instructions": "Take 1 capsule daily with food.",
      "warnings": "Avoid if you have kidney disease or take ACE inhibitors."
    },
    {
      "id": "supp_46",
      "name": "Magnesium Glycinate Extra Strength Gen 4",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Highly bioavailable magnesium for muscle relaxation, sleep, and nerve health.",
      "instructions": "Take 2 capsules before bedtime with water.",
      "warnings": "May cause loose stools if taken in excess."
    },
    {
      "id": "supp_47",
      "name": "Zinc Picolinate Extra Strength Gen 4",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Essential mineral for immune defense, testosterone production, and skin healing.",
      "instructions": "Take 1 capsule daily with a hearty meal.",
      "warnings": "Never take on an empty stomach; can cause severe nausea."
    },
    {
      "id": "supp_48",
      "name": "Iron Bisglycinate Extra Strength Gen 4",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Gentle iron formulation to prevent anemia without causing constipation.",
      "instructions": "Take 1 capsule daily on an empty stomach with Vitamin C.",
      "warnings": "Keep out of reach of children. Do not take with coffee or tea."
    },
    {
      "id": "supp_49",
      "name": "Calcium Carbonate Extra Strength Gen 4",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Supports bone structure, dental strength, and muscle function.",
      "instructions": "Take 1 tablet twice daily with food.",
      "warnings": "Do not take alongside Iron; inhibits absorption."
    },
    {
      "id": "supp_50",
      "name": "Potassium Citrate Extra Strength Gen 4",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Supports healthy blood pressure, fluid balance, and kidney function.",
      "instructions": "Take 1 capsule daily with food.",
      "warnings": "Avoid if you have kidney disease or take ACE inhibitors."
    },
    {
      "id": "supp_51",
      "name": "Magnesium Glycinate Extra Strength Gen 5",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Highly bioavailable magnesium for muscle relaxation, sleep, and nerve health.",
      "instructions": "Take 2 capsules before bedtime with water.",
      "warnings": "May cause loose stools if taken in excess."
    },
    {
      "id": "supp_52",
      "name": "Zinc Picolinate Extra Strength Gen 5",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Essential mineral for immune defense, testosterone production, and skin healing.",
      "instructions": "Take 1 capsule daily with a hearty meal.",
      "warnings": "Never take on an empty stomach; can cause severe nausea."
    },
    {
      "id": "supp_53",
      "name": "Iron Bisglycinate Extra Strength Gen 5",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Gentle iron formulation to prevent anemia without causing constipation.",
      "instructions": "Take 1 capsule daily on an empty stomach with Vitamin C.",
      "warnings": "Keep out of reach of children. Do not take with coffee or tea."
    },
    {
      "id": "supp_54",
      "name": "Calcium Carbonate Extra Strength Gen 5",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Supports bone structure, dental strength, and muscle function.",
      "instructions": "Take 1 tablet twice daily with food.",
      "warnings": "Do not take alongside Iron; inhibits absorption."
    },
    {
      "id": "supp_55",
      "name": "Potassium Citrate Extra Strength Gen 5",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Supports healthy blood pressure, fluid balance, and kidney function.",
      "instructions": "Take 1 capsule daily with food.",
      "warnings": "Avoid if you have kidney disease or take ACE inhibitors."
    },
    {
      "id": "supp_56",
      "name": "Magnesium Glycinate Extra Strength Gen 6",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Highly bioavailable magnesium for muscle relaxation, sleep, and nerve health.",
      "instructions": "Take 2 capsules before bedtime with water.",
      "warnings": "May cause loose stools if taken in excess."
    },
    {
      "id": "supp_57",
      "name": "Zinc Picolinate Extra Strength Gen 6",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Essential mineral for immune defense, testosterone production, and skin healing.",
      "instructions": "Take 1 capsule daily with a hearty meal.",
      "warnings": "Never take on an empty stomach; can cause severe nausea."
    },
    {
      "id": "supp_58",
      "name": "Iron Bisglycinate Extra Strength Gen 6",
      "category": "Mineral",
      "dose": "250 mg",
      "description": "Gentle iron formulation to prevent anemia without causing constipation.",
      "instructions": "Take 1 capsule daily on an empty stomach with Vitamin C.",
      "warnings": "Keep out of reach of children. Do not take with coffee or tea."
    },
    {
      "id": "supp_59",
      "name": "Calcium Carbonate Extra Strength Gen 6",
      "category": "Mineral",
      "dose": "500 mg",
      "description": "Supports bone structure, dental strength, and muscle function.",
      "instructions": "Take 1 tablet twice daily with food.",
      "warnings": "Do not take alongside Iron; inhibits absorption."
    },
    {
      "id": "supp_60",
      "name": "Potassium Citrate Extra Strength Gen 6",
      "category": "Mineral",
      "dose": "750 mg",
      "description": "Supports healthy blood pressure, fluid balance, and kidney function.",
      "instructions": "Take 1 capsule daily with food.",
      "warnings": "Avoid if you have kidney disease or take ACE inhibitors."
    },
    {
      "id": "supp_61",
      "name": "Ashwagandha KSM-66",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_62",
      "name": "Curcumin C3 Complex",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_63",
      "name": "Ginkgo Biloba",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Improves cerebral blood circulation, memory, and cognitive sharpness.",
      "instructions": "Take 1 capsule in the morning.",
      "warnings": "Do not take with other blood thinners."
    },
    {
      "id": "supp_64",
      "name": "Milk Thistle",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Protects liver cells and promotes detoxification pathways.",
      "instructions": "Take 1 capsule twice daily.",
      "warnings": "May cause mild laxative effect."
    },
    {
      "id": "supp_65",
      "name": "Ashwagandha KSM-66 Extra Strength Gen 2",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_66",
      "name": "Curcumin C3 Complex Extra Strength Gen 2",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_67",
      "name": "Ginkgo Biloba Extra Strength Gen 2",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Improves cerebral blood circulation, memory, and cognitive sharpness.",
      "instructions": "Take 1 capsule in the morning.",
      "warnings": "Do not take with other blood thinners."
    },
    {
      "id": "supp_68",
      "name": "Milk Thistle Extra Strength Gen 2",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Protects liver cells and promotes detoxification pathways.",
      "instructions": "Take 1 capsule twice daily.",
      "warnings": "May cause mild laxative effect."
    },
    {
      "id": "supp_69",
      "name": "Ashwagandha KSM-66 Extra Strength Gen 3",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_70",
      "name": "Curcumin C3 Complex Extra Strength Gen 3",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_71",
      "name": "Ginkgo Biloba Extra Strength Gen 3",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Improves cerebral blood circulation, memory, and cognitive sharpness.",
      "instructions": "Take 1 capsule in the morning.",
      "warnings": "Do not take with other blood thinners."
    },
    {
      "id": "supp_72",
      "name": "Milk Thistle Extra Strength Gen 3",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Protects liver cells and promotes detoxification pathways.",
      "instructions": "Take 1 capsule twice daily.",
      "warnings": "May cause mild laxative effect."
    },
    {
      "id": "supp_73",
      "name": "Ashwagandha KSM-66 Extra Strength Gen 4",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_74",
      "name": "Curcumin C3 Complex Extra Strength Gen 4",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_75",
      "name": "Ginkgo Biloba Extra Strength Gen 4",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Improves cerebral blood circulation, memory, and cognitive sharpness.",
      "instructions": "Take 1 capsule in the morning.",
      "warnings": "Do not take with other blood thinners."
    },
    {
      "id": "supp_76",
      "name": "Milk Thistle Extra Strength Gen 4",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Protects liver cells and promotes detoxification pathways.",
      "instructions": "Take 1 capsule twice daily.",
      "warnings": "May cause mild laxative effect."
    },
    {
      "id": "supp_77",
      "name": "Ashwagandha KSM-66 Extra Strength Gen 5",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_78",
      "name": "Curcumin C3 Complex Extra Strength Gen 5",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_79",
      "name": "Ginkgo Biloba Extra Strength Gen 5",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Improves cerebral blood circulation, memory, and cognitive sharpness.",
      "instructions": "Take 1 capsule in the morning.",
      "warnings": "Do not take with other blood thinners."
    },
    {
      "id": "supp_80",
      "name": "Milk Thistle Extra Strength Gen 5",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Protects liver cells and promotes detoxification pathways.",
      "instructions": "Take 1 capsule twice daily.",
      "warnings": "May cause mild laxative effect."
    },
    {
      "id": "supp_81",
      "name": "Ashwagandha KSM-66 Extra Strength Gen 6",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_82",
      "name": "Curcumin C3 Complex Extra Strength Gen 6",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_83",
      "name": "Ginkgo Biloba Extra Strength Gen 6",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Improves cerebral blood circulation, memory, and cognitive sharpness.",
      "instructions": "Take 1 capsule in the morning.",
      "warnings": "Do not take with other blood thinners."
    },
    {
      "id": "supp_84",
      "name": "Milk Thistle Extra Strength Gen 6",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Protects liver cells and promotes detoxification pathways.",
      "instructions": "Take 1 capsule twice daily.",
      "warnings": "May cause mild laxative effect."
    },
    {
      "id": "supp_85",
      "name": "Ashwagandha KSM-66 Extra Strength Gen 7",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_86",
      "name": "Curcumin C3 Complex Extra Strength Gen 7",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_87",
      "name": "Ginkgo Biloba Extra Strength Gen 7",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Improves cerebral blood circulation, memory, and cognitive sharpness.",
      "instructions": "Take 1 capsule in the morning.",
      "warnings": "Do not take with other blood thinners."
    },
    {
      "id": "supp_88",
      "name": "Milk Thistle Extra Strength Gen 7",
      "category": "Herbal",
      "dose": "250 mg",
      "description": "Protects liver cells and promotes detoxification pathways.",
      "instructions": "Take 1 capsule twice daily.",
      "warnings": "May cause mild laxative effect."
    },
    {
      "id": "supp_89",
      "name": "Ashwagandha KSM-66 Extra Strength Gen 8",
      "category": "Herbal",
      "dose": "500 mg",
      "description": "Adaptogenic herb clinically proven to reduce stress, anxiety, and cortisol.",
      "instructions": "Take 1 capsule twice daily with meals.",
      "warnings": "Do not use if you have hyperthyroidism or are pregnant."
    },
    {
      "id": "supp_90",
      "name": "Curcumin C3 Complex Extra Strength Gen 8",
      "category": "Herbal",
      "dose": "750 mg",
      "description": "Potent anti-inflammatory extract derived from Turmeric root.",
      "instructions": "Take 1 capsule daily with black pepper extract (piperine).",
      "warnings": "May act as a mild blood thinner; avoid before surgery."
    },
    {
      "id": "supp_91",
      "name": "L-Theanine",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_92",
      "name": "L-Tyrosine",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_93",
      "name": "Creatine Monohydrate",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_94",
      "name": "L-Theanine Extra Strength Gen 2",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_95",
      "name": "L-Tyrosine Extra Strength Gen 2",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_96",
      "name": "Creatine Monohydrate Extra Strength Gen 2",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_97",
      "name": "L-Theanine Extra Strength Gen 3",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_98",
      "name": "L-Tyrosine Extra Strength Gen 3",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_99",
      "name": "Creatine Monohydrate Extra Strength Gen 3",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_100",
      "name": "L-Theanine Extra Strength Gen 4",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_101",
      "name": "L-Tyrosine Extra Strength Gen 4",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_102",
      "name": "Creatine Monohydrate Extra Strength Gen 4",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_103",
      "name": "L-Theanine Extra Strength Gen 5",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_104",
      "name": "L-Tyrosine Extra Strength Gen 5",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_105",
      "name": "Creatine Monohydrate Extra Strength Gen 5",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_106",
      "name": "L-Theanine Extra Strength Gen 6",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_107",
      "name": "L-Tyrosine Extra Strength Gen 6",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_108",
      "name": "Creatine Monohydrate Extra Strength Gen 6",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_109",
      "name": "L-Theanine Extra Strength Gen 7",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_110",
      "name": "L-Tyrosine Extra Strength Gen 7",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_111",
      "name": "Creatine Monohydrate Extra Strength Gen 7",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_112",
      "name": "L-Theanine Extra Strength Gen 8",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_113",
      "name": "L-Tyrosine Extra Strength Gen 8",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_114",
      "name": "Creatine Monohydrate Extra Strength Gen 8",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_115",
      "name": "L-Theanine Extra Strength Gen 9",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_116",
      "name": "L-Tyrosine Extra Strength Gen 9",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_117",
      "name": "Creatine Monohydrate Extra Strength Gen 9",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    },
    {
      "id": "supp_118",
      "name": "L-Theanine Extra Strength Gen 10",
      "category": "Amino Acid",
      "dose": "250 mg",
      "description": "Promotes relaxation and focused calm without causing drowsiness.",
      "instructions": "Take 1 capsule alongside your morning coffee.",
      "warnings": "None reported."
    },
    {
      "id": "supp_119",
      "name": "L-Tyrosine Extra Strength Gen 10",
      "category": "Amino Acid",
      "dose": "500 mg",
      "description": "Precursor to dopamine and adrenaline; boosts mental focus under stress.",
      "instructions": "Take 1 capsule in the morning on an empty stomach.",
      "warnings": "Do not take if using MAOIs or have melanoma."
    },
    {
      "id": "supp_120",
      "name": "Creatine Monohydrate Extra Strength Gen 10",
      "category": "Amino Acid",
      "dose": "750 mg",
      "description": "Improves muscular strength, anaerobic power, and cognitive energy.",
      "instructions": "Take 5g daily mixed with water or juice.",
      "warnings": "Maintain adequate hydration throughout the day."
    }
  ],
  "insights": [
    {
      "id": "ins_1",
      "category": "Biohacking",
      "titleEn": "Neurobiology of L-Theanine & Caffeine Synergy in Cognitive Enhancement - Clinical Study 1",
      "titleId": "Neurobiologi Sinergi L-Theanine & Kafein dalam Peningkatan Kognitif - Studi Klinis 1",
      "readTime": "6 min read",
      "citation": "Journal of Neurochemistry (2021) &bull; PMID: 32904812",
      "excerptEn": "Discover the specific neurological pathways through which the caffeine and L-Theanine stack enhances focus without triggering anxiety or jitteriness.",
      "excerptId": "Temukan jalur neurologis spesifik di mana kombinasi kafein dan L-Theanine meningkatkan fokus tanpa memicu kecemasan atau kegelisahan.",
      "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Published clinical trials reveal that L-Theanine directly crosses the blood-brain barrier. It stimulates alpha brain waves associated with relaxed alertness, working synergistically with caffeine's adenosine receptor blockade to boost cognitive throughput.",
      "contentId": "Uji klinis yang dipublikasikan menunjukkan bahwa L-Theanine secara langsung menembus penghalang darah-otak. Ini menstimulasi gelombang otak alfa yang terkait dengan kewaspadaan santai, bekerja secara sinergis dengan pemblokiran reseptor adenosin kafein."
    },
    {
      "id": "ins_2",
      "category": "Metabolism",
      "titleEn": "How Ashwagandha KSM-66 Standardized Extract Reduces Serum Cortisol Levels by 27% - Clinical Study 1",
      "titleId": "Bagaimana Ekstrak Terstandardisasi Ashwagandha KSM-66 Menurunkan Kadar Kortisol Serum sebesar 27% - Studi Klinis 1",
      "readTime": "8 min read",
      "citation": "Indian Journal of Psychological Medicine (2019) &bull; PMID: 23439002",
      "excerptEn": "Explore the double-blind, placebo-controlled clinical trials highlighting adaptogenic effects on the HPA axis.",
      "excerptId": "Jelajahi uji klinis acak ganda terkontrol plasebo yang menyoroti efek adaptogenik pada sumbu HPA.",
      "image": "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Clinical trials proved that daily intake of 600mg KSM-66 Ashwagandha lowers serum cortisol levels, reduces chronic stress biomarkers, and balances baseline autonomic metrics.",
      "contentId": "Uji klinis membuktikan bahwa asupan harian 600mg KSM-66 Ashwagandha menurunkan kadar kortisol serum, mengurangi biomarker stres kronis, dan menyeimbangkan metrik otonom dasar."
    },
    {
      "id": "ins_3",
      "category": "Longevity",
      "titleEn": "Vitamin D3 & K2 Co-Administration: Preventing Ectopic Calcium Deposition in Coronary Arteries - Clinical Study 1",
      "titleId": "Pemberian Bersama Vitamin D3 & K2: Mencegah Deposisi Kalsium Ektopik pada Arteri Koroner - Studi Klinis 1",
      "readTime": "7 min read",
      "citation": "American Heart Journal (2022) &bull; PMID: 35198004",
      "excerptEn": "Why taking Vitamin D3 alone could increase arterial calcification risk, and how Vitamin K2 acts as the crucial biological traffic controller.",
      "excerptId": "Mengapa mengonsumsi Vitamin D3 saja dapat meningkatkan risiko kalsifikasi arteri, dan bagaimana Vitamin K2 bertindak sebagai pengatur lalu lintas biologis yang penting.",
      "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Research details that Vitamin D3 boosts calcium absorption, but Vitamin K2 activates Osteocalcin and Matrix Gla Protein, actively directing calcium to bones and keeping it out of the blood vessel walls.",
      "contentId": "Penelitian mendetail menunjukkan bahwa Vitamin D3 meningkatkan penyerapan kalsium, tetapi Vitamin K2 mengaktifkan Osteokalsin dan Protein Gla Matriks, secara aktif mengarahkan kalsium ke tulang dan menjauhkannya dari dinding pembuluh darah."
    },
    {
      "id": "ins_4",
      "category": "Nutrition",
      "titleEn": "Glycine Glycinate vs Magnesium Oxide: Bioavailability Rates in Cellular Energy Uplift - Clinical Study 1",
      "titleId": "Glisin Glisinat vs Magnesium Oksida: Tingkat Bioavailabilitas dalam Peningkatan Energi Seluler - Studi Klinis 1",
      "readTime": "5 min read",
      "citation": "European Journal of Clinical Pharmacology (2020) &bull; PMID: 29048123",
      "excerptEn": "An in-depth absorption study measuring chelation pathways and intestinal absorption of different Magnesium molecules.",
      "excerptId": "Studi penyerapan mendalam yang mengukur jalur khelasi dan penyerapan usus dari berbagai molekul Magnesium.",
      "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Chelated magnesium (bisglycinate) binds to glycine, an amino acid, bypassing normal mineral transporter competition. Oxide formulations suffer up to 90% excretion due to poor solubility in digestive juices.",
      "contentId": "Magnesium khelasi (bisglisinat) berikatan dengan glisin, suatu asam amino, melewati persaingan pengangkut mineral biasa. Formulasi oksida mengalami ekskresi hingga 90% karena kelarutan yang buruk dalam cairan pencernaan."
    },
    {
      "id": "ins_5",
      "category": "Longevity",
      "titleEn": "The Longevity Pathways: How NMN Reactivates Sirtuins to Combat Cellular Senescence - Clinical Study 1",
      "titleId": "Jalur Panjang Umur: Bagaimana NMN Mengaktifkan Kembali Sirtuin untuk Melawan Penuaan Seluler - Studi Klinis 1",
      "readTime": "9 min read",
      "citation": "Nature Metabolism (2023) &bull; PMID: 36789012",
      "excerptEn": "How Nicotinamide Mononucleotide acts as a precursor to NAD+ to repair broken DNA structures and restore mitochondrial function.",
      "excerptId": "Bagaimana Nikotinamida Mononukleotida bertindak sebagai prekursor NAD+ untuk memperbaiki struktur DNA yang rusak dan memulihkan fungsi mitokondria.",
      "image": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Nature Metabolism reports that NAD+ depletion is a primary cause of biological aging. NMN directly restores intracellular NAD+ pools, upregulating SIRT1 to repair double-strand DNA breaks.",
      "contentId": "Nature Metabolism melaporkan bahwa deplesi NAD+ adalah penyebab utama penuaan biologis. NMN secara langsung mengembalikan kumpulan NAD+ intraseluler, meningkatkan regulasi SIRT1 untuk memperbaiki kerusakan DNA untai ganda."
    },
    {
      "id": "ins_6",
      "category": "Biohacking",
      "titleEn": "Neurobiology of L-Theanine & Caffeine Synergy in Cognitive Enhancement - Clinical Study 2",
      "titleId": "Neurobiologi Sinergi L-Theanine & Kafein dalam Peningkatan Kognitif - Studi Klinis 2",
      "readTime": "6 min read",
      "citation": "Journal of Neurochemistry (2021) &bull; PMID: 32904812",
      "excerptEn": "Discover the specific neurological pathways through which the caffeine and L-Theanine stack enhances focus without triggering anxiety or jitteriness.",
      "excerptId": "Temukan jalur neurologis spesifik di mana kombinasi kafein dan L-Theanine meningkatkan fokus tanpa memicu kecemasan atau kegelisahan.",
      "image": "https://images.unsplash.com/photo-1511295742364-92767ed6054a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Published clinical trials reveal that L-Theanine directly crosses the blood-brain barrier. It stimulates alpha brain waves associated with relaxed alertness, working synergistically with caffeine's adenosine receptor blockade to boost cognitive throughput.",
      "contentId": "Uji klinis yang dipublikasikan menunjukkan bahwa L-Theanine secara langsung menembus penghalang darah-otak. Ini menstimulasi gelombang otak alfa yang terkait dengan kewaspadaan santai, bekerja secara sinergis dengan pemblokiran reseptor adenosin kafein."
    },
    {
      "id": "ins_7",
      "category": "Metabolism",
      "titleEn": "How Ashwagandha KSM-66 Standardized Extract Reduces Serum Cortisol Levels by 27% - Clinical Study 2",
      "titleId": "Bagaimana Ekstrak Terstandardisasi Ashwagandha KSM-66 Menurunkan Kadar Kortisol Serum sebesar 27% - Studi Klinis 2",
      "readTime": "8 min read",
      "citation": "Indian Journal of Psychological Medicine (2019) &bull; PMID: 23439002",
      "excerptEn": "Explore the double-blind, placebo-controlled clinical trials highlighting adaptogenic effects on the HPA axis.",
      "excerptId": "Jelajahi uji klinis acak ganda terkontrol plasebo yang menyoroti efek adaptogenik pada sumbu HPA.",
      "image": "https://images.unsplash.com/photo-1611079830811-b65d1a34c99e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Clinical trials proved that daily intake of 600mg KSM-66 Ashwagandha lowers serum cortisol levels, reduces chronic stress biomarkers, and balances baseline autonomic metrics.",
      "contentId": "Uji klinis membuktikan bahwa asupan harian 600mg KSM-66 Ashwagandha menurunkan kadar kortisol serum, mengurangi biomarker stres kronis, dan menyeimbangkan metrik otonom dasar."
    },
    {
      "id": "ins_8",
      "category": "Longevity",
      "titleEn": "Vitamin D3 & K2 Co-Administration: Preventing Ectopic Calcium Deposition in Coronary Arteries - Clinical Study 2",
      "titleId": "Pemberian Bersama Vitamin D3 & K2: Mencegah Deposisi Kalsium Ektopik pada Arteri Koroner - Studi Klinis 2",
      "readTime": "7 min read",
      "citation": "American Heart Journal (2022) &bull; PMID: 35198004",
      "excerptEn": "Why taking Vitamin D3 alone could increase arterial calcification risk, and how Vitamin K2 acts as the crucial biological traffic controller.",
      "excerptId": "Mengapa mengonsumsi Vitamin D3 saja dapat meningkatkan risiko kalsifikasi arteri, dan bagaimana Vitamin K2 bertindak sebagai pengatur lalu lintas biologis yang penting.",
      "image": "https://images.unsplash.com/photo-1517817748493-49ec54a32465?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Research details that Vitamin D3 boosts calcium absorption, but Vitamin K2 activates Osteocalcin and Matrix Gla Protein, actively directing calcium to bones and keeping it out of the blood vessel walls.",
      "contentId": "Penelitian mendetail menunjukkan bahwa Vitamin D3 meningkatkan penyerapan kalsium, tetapi Vitamin K2 mengaktifkan Osteokalsin dan Protein Gla Matriks, secara aktif mengarahkan kalsium ke tulang dan menjauhkannya dari dinding pembuluh darah."
    },
    {
      "id": "ins_9",
      "category": "Nutrition",
      "titleEn": "Glycine Glycinate vs Magnesium Oxide: Bioavailability Rates in Cellular Energy Uplift - Clinical Study 2",
      "titleId": "Glisin Glisinat vs Magnesium Oksida: Tingkat Bioavailabilitas dalam Peningkatan Energi Seluler - Studi Klinis 2",
      "readTime": "5 min read",
      "citation": "European Journal of Clinical Pharmacology (2020) &bull; PMID: 29048123",
      "excerptEn": "An in-depth absorption study measuring chelation pathways and intestinal absorption of different Magnesium molecules.",
      "excerptId": "Studi penyerapan mendalam yang mengukur jalur khelasi dan penyerapan usus dari berbagai molekul Magnesium.",
      "image": "https://images.unsplash.com/photo-1530026405186-ed1ea00d2eab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Chelated magnesium (bisglycinate) binds to glycine, an amino acid, bypassing normal mineral transporter competition. Oxide formulations suffer up to 90% excretion due to poor solubility in digestive juices.",
      "contentId": "Magnesium khelasi (bisglisinat) berikatan dengan glisin, suatu asam amino, melewati persaingan pengangkut mineral biasa. Formulasi oksida mengalami ekskresi hingga 90% karena kelarutan yang buruk dalam cairan pencernaan."
    },
    {
      "id": "ins_10",
      "category": "Longevity",
      "titleEn": "The Longevity Pathways: How NMN Reactivates Sirtuins to Combat Cellular Senescence - Clinical Study 2",
      "titleId": "Jalur Panjang Umur: Bagaimana NMN Mengaktifkan Kembali Sirtuin untuk Melawan Penuaan Seluler - Studi Klinis 2",
      "readTime": "9 min read",
      "citation": "Nature Metabolism (2023) &bull; PMID: 36789012",
      "excerptEn": "How Nicotinamide Mononucleotide acts as a precursor to NAD+ to repair broken DNA structures and restore mitochondrial function.",
      "excerptId": "Bagaimana Nikotinamida Mononukleotida bertindak sebagai prekursor NAD+ untuk memperbaiki struktur DNA yang rusak dan memulihkan fungsi mitokondria.",
      "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Nature Metabolism reports that NAD+ depletion is a primary cause of biological aging. NMN directly restores intracellular NAD+ pools, upregulating SIRT1 to repair double-strand DNA breaks.",
      "contentId": "Nature Metabolism melaporkan bahwa deplesi NAD+ adalah penyebab utama penuaan biologis. NMN secara langsung mengembalikan kumpulan NAD+ intraseluler, meningkatkan regulasi SIRT1 untuk memperbaiki kerusakan DNA untai ganda."
    },
    {
      "id": "ins_11",
      "category": "Biohacking",
      "titleEn": "Neurobiology of L-Theanine & Caffeine Synergy in Cognitive Enhancement - Clinical Study 3",
      "titleId": "Neurobiologi Sinergi L-Theanine & Kafein dalam Peningkatan Kognitif - Studi Klinis 3",
      "readTime": "6 min read",
      "citation": "Journal of Neurochemistry (2021) &bull; PMID: 32904812",
      "excerptEn": "Discover the specific neurological pathways through which the caffeine and L-Theanine stack enhances focus without triggering anxiety or jitteriness.",
      "excerptId": "Temukan jalur neurologis spesifik di mana kombinasi kafein dan L-Theanine meningkatkan fokus tanpa memicu kecemasan atau kegelisahan.",
      "image": "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Published clinical trials reveal that L-Theanine directly crosses the blood-brain barrier. It stimulates alpha brain waves associated with relaxed alertness, working synergistically with caffeine's adenosine receptor blockade to boost cognitive throughput.",
      "contentId": "Uji klinis yang dipublikasikan menunjukkan bahwa L-Theanine secara langsung menembus penghalang darah-otak. Ini menstimulasi gelombang otak alfa yang terkait dengan kewaspadaan santai, bekerja secara sinergis dengan pemblokiran reseptor adenosin kafein."
    },
    {
      "id": "ins_12",
      "category": "Metabolism",
      "titleEn": "How Ashwagandha KSM-66 Standardized Extract Reduces Serum Cortisol Levels by 27% - Clinical Study 3",
      "titleId": "Bagaimana Ekstrak Terstandardisasi Ashwagandha KSM-66 Menurunkan Kadar Kortisol Serum sebesar 27% - Studi Klinis 3",
      "readTime": "8 min read",
      "citation": "Indian Journal of Psychological Medicine (2019) &bull; PMID: 23439002",
      "excerptEn": "Explore the double-blind, placebo-controlled clinical trials highlighting adaptogenic effects on the HPA axis.",
      "excerptId": "Jelajahi uji klinis acak ganda terkontrol plasebo yang menyoroti efek adaptogenik pada sumbu HPA.",
      "image": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Clinical trials proved that daily intake of 600mg KSM-66 Ashwagandha lowers serum cortisol levels, reduces chronic stress biomarkers, and balances baseline autonomic metrics.",
      "contentId": "Uji klinis membuktikan bahwa asupan harian 600mg KSM-66 Ashwagandha menurunkan kadar kortisol serum, mengurangi biomarker stres kronis, dan menyeimbangkan metrik otonom dasar."
    },
    {
      "id": "ins_13",
      "category": "Longevity",
      "titleEn": "Vitamin D3 & K2 Co-Administration: Preventing Ectopic Calcium Deposition in Coronary Arteries - Clinical Study 3",
      "titleId": "Pemberian Bersama Vitamin D3 & K2: Mencegah Deposisi Kalsium Ektopik pada Arteri Koroner - Studi Klinis 3",
      "readTime": "7 min read",
      "citation": "American Heart Journal (2022) &bull; PMID: 35198004",
      "excerptEn": "Why taking Vitamin D3 alone could increase arterial calcification risk, and how Vitamin K2 acts as the crucial biological traffic controller.",
      "excerptId": "Mengapa mengonsumsi Vitamin D3 saja dapat meningkatkan risiko kalsifikasi arteri, dan bagaimana Vitamin K2 bertindak sebagai pengatur lalu lintas biologis yang penting.",
      "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Research details that Vitamin D3 boosts calcium absorption, but Vitamin K2 activates Osteocalcin and Matrix Gla Protein, actively directing calcium to bones and keeping it out of the blood vessel walls.",
      "contentId": "Penelitian mendetail menunjukkan bahwa Vitamin D3 meningkatkan penyerapan kalsium, tetapi Vitamin K2 mengaktifkan Osteokalsin dan Protein Gla Matriks, secara aktif mengarahkan kalsium ke tulang dan menjauhkannya dari dinding pembuluh darah."
    },
    {
      "id": "ins_14",
      "category": "Nutrition",
      "titleEn": "Glycine Glycinate vs Magnesium Oxide: Bioavailability Rates in Cellular Energy Uplift - Clinical Study 3",
      "titleId": "Glisin Glisinat vs Magnesium Oksida: Tingkat Bioavailabilitas dalam Peningkatan Energi Seluler - Studi Klinis 3",
      "readTime": "5 min read",
      "citation": "European Journal of Clinical Pharmacology (2020) &bull; PMID: 29048123",
      "excerptEn": "An in-depth absorption study measuring chelation pathways and intestinal absorption of different Magnesium molecules.",
      "excerptId": "Studi penyerapan mendalam yang mengukur jalur khelasi dan penyerapan usus dari berbagai molekul Magnesium.",
      "image": "https://images.unsplash.com/photo-1579684389807-0a2575f053e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Chelated magnesium (bisglycinate) binds to glycine, an amino acid, bypassing normal mineral transporter competition. Oxide formulations suffer up to 90% excretion due to poor solubility in digestive juices.",
      "contentId": "Magnesium khelasi (bisglisinat) berikatan dengan glisin, suatu asam amino, melewati persaingan pengangkut mineral biasa. Formulasi oksida mengalami ekskresi hingga 90% karena kelarutan yang buruk dalam cairan pencernaan."
    },
    {
      "id": "ins_15",
      "category": "Longevity",
      "titleEn": "The Longevity Pathways: How NMN Reactivates Sirtuins to Combat Cellular Senescence - Clinical Study 3",
      "titleId": "Jalur Panjang Umur: Bagaimana NMN Mengaktifkan Kembali Sirtuin untuk Melawan Penuaan Seluler - Studi Klinis 3",
      "readTime": "9 min read",
      "citation": "Nature Metabolism (2023) &bull; PMID: 36789012",
      "excerptEn": "How Nicotinamide Mononucleotide acts as a precursor to NAD+ to repair broken DNA structures and restore mitochondrial function.",
      "excerptId": "Bagaimana Nikotinamida Mononukleotida bertindak sebagai prekursor NAD+ untuk memperbaiki struktur DNA yang rusak dan memulihkan fungsi mitokondria.",
      "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Nature Metabolism reports that NAD+ depletion is a primary cause of biological aging. NMN directly restores intracellular NAD+ pools, upregulating SIRT1 to repair double-strand DNA breaks.",
      "contentId": "Nature Metabolism melaporkan bahwa deplesi NAD+ adalah penyebab utama penuaan biologis. NMN secara langsung mengembalikan kumpulan NAD+ intraseluler, meningkatkan regulasi SIRT1 untuk memperbaiki kerusakan DNA untai ganda."
    },
    {
      "id": "ins_16",
      "category": "Biohacking",
      "titleEn": "Neurobiology of L-Theanine & Caffeine Synergy in Cognitive Enhancement - Clinical Study 4",
      "titleId": "Neurobiologi Sinergi L-Theanine & Kafein dalam Peningkatan Kognitif - Studi Klinis 4",
      "readTime": "6 min read",
      "citation": "Journal of Neurochemistry (2021) &bull; PMID: 32904812",
      "excerptEn": "Discover the specific neurological pathways through which the caffeine and L-Theanine stack enhances focus without triggering anxiety or jitteriness.",
      "excerptId": "Temukan jalur neurologis spesifik di mana kombinasi kafein dan L-Theanine meningkatkan fokus tanpa memicu kecemasan atau kegelisahan.",
      "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Published clinical trials reveal that L-Theanine directly crosses the blood-brain barrier. It stimulates alpha brain waves associated with relaxed alertness, working synergistically with caffeine's adenosine receptor blockade to boost cognitive throughput.",
      "contentId": "Uji klinis yang dipublikasikan menunjukkan bahwa L-Theanine secara langsung menembus penghalang darah-otak. Ini menstimulasi gelombang otak alfa yang terkait dengan kewaspadaan santai, bekerja secara sinergis dengan pemblokiran reseptor adenosin kafein."
    },
    {
      "id": "ins_17",
      "category": "Metabolism",
      "titleEn": "How Ashwagandha KSM-66 Standardized Extract Reduces Serum Cortisol Levels by 27% - Clinical Study 4",
      "titleId": "Bagaimana Ekstrak Terstandardisasi Ashwagandha KSM-66 Menurunkan Kadar Kortisol Serum sebesar 27% - Studi Klinis 4",
      "readTime": "8 min read",
      "citation": "Indian Journal of Psychological Medicine (2019) &bull; PMID: 23439002",
      "excerptEn": "Explore the double-blind, placebo-controlled clinical trials highlighting adaptogenic effects on the HPA axis.",
      "excerptId": "Jelajahi uji klinis acak ganda terkontrol plasebo yang menyoroti efek adaptogenik pada sumbu HPA.",
      "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Clinical trials proved that daily intake of 600mg KSM-66 Ashwagandha lowers serum cortisol levels, reduces chronic stress biomarkers, and balances baseline autonomic metrics.",
      "contentId": "Uji klinis membuktikan bahwa asupan harian 600mg KSM-66 Ashwagandha menurunkan kadar kortisol serum, mengurangi biomarker stres kronis, dan menyeimbangkan metrik otonom dasar."
    },
    {
      "id": "ins_18",
      "category": "Longevity",
      "titleEn": "Vitamin D3 & K2 Co-Administration: Preventing Ectopic Calcium Deposition in Coronary Arteries - Clinical Study 4",
      "titleId": "Pemberian Bersama Vitamin D3 & K2: Mencegah Deposisi Kalsium Ektopik pada Arteri Koroner - Studi Klinis 4",
      "readTime": "7 min read",
      "citation": "American Heart Journal (2022) &bull; PMID: 35198004",
      "excerptEn": "Why taking Vitamin D3 alone could increase arterial calcification risk, and how Vitamin K2 acts as the crucial biological traffic controller.",
      "excerptId": "Mengapa mengonsumsi Vitamin D3 saja dapat meningkatkan risiko kalsifikasi arteri, dan bagaimana Vitamin K2 bertindak sebagai pengatur lalu lintas biologis yang penting.",
      "image": "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Research details that Vitamin D3 boosts calcium absorption, but Vitamin K2 activates Osteocalcin and Matrix Gla Protein, actively directing calcium to bones and keeping it out of the blood vessel walls.",
      "contentId": "Penelitian mendetail menunjukkan bahwa Vitamin D3 meningkatkan penyerapan kalsium, tetapi Vitamin K2 mengaktifkan Osteokalsin dan Protein Gla Matriks, secara aktif mengarahkan kalsium ke tulang dan menjauhkannya dari dinding pembuluh darah."
    },
    {
      "id": "ins_19",
      "category": "Nutrition",
      "titleEn": "Glycine Glycinate vs Magnesium Oxide: Bioavailability Rates in Cellular Energy Uplift - Clinical Study 4",
      "titleId": "Glisin Glisinat vs Magnesium Oksida: Tingkat Bioavailabilitas dalam Peningkatan Energi Seluler - Studi Klinis 4",
      "readTime": "5 min read",
      "citation": "European Journal of Clinical Pharmacology (2020) &bull; PMID: 29048123",
      "excerptEn": "An in-depth absorption study measuring chelation pathways and intestinal absorption of different Magnesium molecules.",
      "excerptId": "Studi penyerapan mendalam yang mengukur jalur khelasi dan penyerapan usus dari berbagai molekul Magnesium.",
      "image": "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Chelated magnesium (bisglycinate) binds to glycine, an amino acid, bypassing normal mineral transporter competition. Oxide formulations suffer up to 90% excretion due to poor solubility in digestive juices.",
      "contentId": "Magnesium khelasi (bisglisinat) berikatan dengan glisin, suatu asam amino, melewati persaingan pengangkut mineral biasa. Formulasi oksida mengalami ekskresi hingga 90% karena kelarutan yang buruk dalam cairan pencernaan."
    },
    {
      "id": "ins_20",
      "category": "Longevity",
      "titleEn": "The Longevity Pathways: How NMN Reactivates Sirtuins to Combat Cellular Senescence - Clinical Study 4",
      "titleId": "Jalur Panjang Umur: Bagaimana NMN Mengaktifkan Kembali Sirtuin untuk Melawan Penuaan Seluler - Studi Klinis 4",
      "readTime": "9 min read",
      "citation": "Nature Metabolism (2023) &bull; PMID: 36789012",
      "excerptEn": "How Nicotinamide Mononucleotide acts as a precursor to NAD+ to repair broken DNA structures and restore mitochondrial function.",
      "excerptId": "Bagaimana Nikotinamida Mononukleotida bertindak sebagai prekursor NAD+ untuk memperbaiki struktur DNA yang rusak dan memulihkan fungsi mitokondria.",
      "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "contentEn": "Nature Metabolism reports that NAD+ depletion is a primary cause of biological aging. NMN directly restores intracellular NAD+ pools, upregulating SIRT1 to repair double-strand DNA breaks.",
      "contentId": "Nature Metabolism melaporkan bahwa deplesi NAD+ adalah penyebab utama penuaan biologis. NMN secara langsung mengembalikan kumpulan NAD+ intraseluler, meningkatkan regulasi SIRT1 untuk memperbaiki kerusakan DNA untai ganda."
    }
  ],
  "activeStacks": [
    {
      "id": "st_1",
      "name": "Deep Sleep Formula",
      "description": "Designed to optimize sleep latency and deep sleep cycles.",
      "items": [
        "Magnesium Glycinate",
        "L-Theanine",
        "Chamomile"
      ]
    },
    {
      "id": "st_2",
      "name": "Morning Focus & Energy",
      "description": "Clean focus without jittery feelings.",
      "items": [
        "L-Tyrosine",
        "L-Theanine",
        "Vitamin B12"
      ]
    },
    {
      "id": "st_3",
      "name": "Heart & Vascular Support",
      "description": "Keeps calcium in bones and out of arteries.",
      "items": [
        "Vitamin D3",
        "Vitamin K2",
        "CoQ10"
      ]
    },
    {
      "id": "st_4",
      "name": "Immune Guard",
      "description": "Strong daily antioxidant support.",
      "items": [
        "Vitamin C",
        "Zinc Picolinate",
        "Elderberry"
      ]
    },
    {
      "id": "st_5",
      "name": "Joint Repair Stack",
      "description": "Reduces inflammation and promotes cartilage health.",
      "items": [
        "Curcumin",
        "Ginger Root",
        "Glucosamine"
      ]
    },
    {
      "id": "st_6",
      "name": "Brain Booster Stack",
      "description": "Enhances cognitive performance and memory.",
      "items": [
        "Ginkgo Biloba",
        "Lion's Mane",
        "CDP Choline"
      ]
    },
    {
      "id": "st_7",
      "name": "Adaptogenic Shield",
      "description": "Reduces long-term emotional and physical cortisol.",
      "items": [
        "Ashwagandha",
        "Rhodiola Rosea",
        "Holy Basil"
      ]
    },
    {
      "id": "st_8",
      "name": "Athletic Recovery",
      "description": "Promotes protein synthesis and reduces lactic acid build-up.",
      "items": [
        "Creatine",
        "BCAA",
        "L-Glutamine"
      ]
    },
    {
      "id": "st_9",
      "name": "Anti-Aging Secret",
      "description": "Enhances cellular longevity and DNA repair.",
      "items": [
        "NMN",
        "Resveratrol",
        "Quercetin"
      ]
    },
    {
      "id": "st_10",
      "name": "Metabolic Support",
      "description": "Improves blood sugar sensitivity and fat metabolism.",
      "items": [
        "Berberine",
        "Chromium",
        "Alpha Lipoic Acid"
      ]
    }
  ],
  "reminders": [
    {
      "id": "rem_1",
      "time": "08:00 AM",
      "name": "Morning Stack (Focus)",
      "active": true
    },
    {
      "id": "rem_2",
      "time": "08:30 AM",
      "name": "Glass of Electrolyte Water",
      "active": true
    },
    {
      "id": "rem_3",
      "time": "10:00 AM",
      "name": "Vitamin C Shield",
      "active": false
    },
    {
      "id": "rem_4",
      "time": "01:00 PM",
      "name": "Lunch Multi-Vitamin",
      "active": true
    },
    {
      "id": "rem_5",
      "time": "03:00 PM",
      "name": "Afternoon Hydration Boost",
      "active": true
    },
    {
      "id": "rem_6",
      "time": "06:30 PM",
      "name": "Dinner Minerals (Zinc & Calcium)",
      "active": true
    },
    {
      "id": "rem_7",
      "time": "08:00 PM",
      "name": "Evening Herbal Infusion",
      "active": false
    },
    {
      "id": "rem_8",
      "time": "09:30 PM",
      "name": "Deep Sleep Stack (Magnesium)",
      "active": true
    },
    {
      "id": "rem_9",
      "time": "10:00 PM",
      "name": "Pre-sleep Meditation Reminder",
      "active": true
    },
    {
      "id": "rem_10",
      "time": "11:00 PM",
      "name": "Wind Down Devices Check",
      "active": true
    }
  ],
  "biomarkers": [
    {
      "id": "bio_1",
      "name": "Vitamin D",
      "value": 58.4,
      "unit": "ng/mL",
      "status": "Optimal",
      "range": "30-100",
      "history": [
        45.2,
        51,
        58.4
      ]
    },
    {
      "id": "bio_2",
      "name": "Ferritin",
      "value": 22,
      "unit": "ng/mL",
      "status": "Low",
      "range": "30-400",
      "history": [
        18.5,
        20.1,
        22
      ]
    },
    {
      "id": "bio_3",
      "name": "Vitamin B12",
      "value": 450,
      "unit": "pg/mL",
      "status": "Optimal",
      "range": "200-900",
      "history": [
        390,
        420,
        450
      ]
    },
    {
      "id": "bio_4",
      "name": "Calcium",
      "value": 9.6,
      "unit": "mg/dL",
      "status": "Optimal",
      "range": "8.5-10.2",
      "history": [
        9.4,
        9.5,
        9.6
      ]
    },
    {
      "id": "bio_5",
      "name": "Iron",
      "value": 85,
      "unit": "mcg/dL",
      "status": "Optimal",
      "range": "60-170",
      "history": [
        70,
        78,
        85
      ]
    },
    {
      "id": "bio_6",
      "name": "Zinc",
      "value": 92,
      "unit": "mcg/dL",
      "status": "Optimal",
      "range": "60-120",
      "history": [
        88,
        90,
        92
      ]
    },
    {
      "id": "bio_7",
      "name": "HbA1c",
      "value": 5.4,
      "unit": "%",
      "status": "Optimal",
      "range": "< 5.7",
      "history": [
        5.6,
        5.5,
        5.4
      ]
    },
    {
      "id": "bio_8",
      "name": "Total Cholesterol",
      "value": 185,
      "unit": "mg/dL",
      "status": "Optimal",
      "range": "< 200",
      "history": [
        195,
        190,
        185
      ]
    }
  ],
  "foodsAndDrugs": [
    {
      "nameEn": "Coffee",
      "nameId": "Kopi"
    },
    {
      "nameEn": "Dairy",
      "nameId": "Produk Susu"
    },
    {
      "nameEn": "Grapefruit Juice",
      "nameId": "Jus Grapefruit"
    },
    {
      "nameEn": "Alcohol",
      "nameId": "Alkohol"
    },
    {
      "nameEn": "Green Tea",
      "nameId": "Teh Hijau"
    },
    {
      "nameEn": "Spinach",
      "nameId": "Bayam"
    },
    {
      "nameEn": "Aspirin",
      "nameId": "Aspirin"
    },
    {
      "nameEn": "Warfarin",
      "nameId": "Warfarin"
    },
    {
      "nameEn": "Ibuprofen",
      "nameId": "Ibuprofen"
    },
    {
      "nameEn": "High-Fiber Meal",
      "nameId": "Makanan Tinggi Serat"
    }
  ],
  "translations": {
    "en": {
      "dashboard": "Dashboard",
      "schedule": "Schedule",
      "my_supplements": "My Supplements",
      "interactions": "Interactions",
      "label_scanner": "Label Scanner",
      "biomarkers": "Biomarkers",
      "active_stacks": "Active Stacks",
      "reminders": "Reminders",
      "hydration": "Hydration",
      "health_insights": "Health Insights",
      "community_feed": "Community Feed",
      "profile": "Profile",
      "settings": "Settings",
      "add_supplement": "Add Supplement",
      "good_afternoon": "Good afternoon!",
      "good_morning": "Good morning!",
      "good_evening": "Good evening!",
      "progress": "Progress",
      "supps_taken": "Supps taken",
      "warnings": "Warnings",
      "inventory": "Inventory",
      "todays_schedule": "Today's Schedule",
      "critical_interactions": "Critical Interactions",
      "reset": "Reset",
      "morning": "Morning",
      "midday": "Midday",
      "evening": "Evening / Night",
      "search_placeholder": "Search supplements...",
      "custom_amount": "Custom Amount",
      "take": "Take",
      "snooze": "Snooze",
      "drank_glass": "Drank a glass",
      "expert_tips": "Expert Tips",
      "safety_first": "Safety First",
      "logout": "Logout Account",
      "personal_info": "Personal Information",
      "security_password": "Security & Password",
      "billing_sub": "Billing & Subscription",
      "notifications": "Notifications",
      "account_settings": "Account Settings",
      "height": "Height",
      "weight": "Weight",
      "health_conditions": "Health Conditions",
      "metabolic_vitality": "Metabolic Vitality",
      "recent_reports": "Recent Reports",
      "preferences": "Preferences",
      "daily_reminders": "Daily Reminders",
      "app_language": "App Language",
      "icloud_sync": "iCloud Sync",
      "pharmacy_grade": "Pharmacy Grade",
      "biometric_login": "Biometric Login (FaceID)",
      "offline_caching": "Offline Local Caching",
      "automated_spacing": "Automated Spacing Alerts",
      "email_summary": "Weekly Email Summary",
      "pdf_report": "Weekly Report PDF Export",
      "backup_google": "Backup to Google Drive",
      "invite_friends": "Invite Friends & Family",
      "privacy_policy": "Data Privacy Policy",
      "back": "Back",
      "undo": "Undo",
      "chat_support": "VitaSync Support",
      "quick_questions": "Quick Questions",
      "welcome_title": "Welcome to VitaSync",
      "welcome_desc": "Your intelligent offline-first pharmacy-grade biohacking, supplement, and health tracker. Ready to optimize your longevity?",
      "get_started": "Get Started"
    },
    "id": {
      "dashboard": "Dasbor",
      "schedule": "Jadwal",
      "my_supplements": "Suplemen Saya",
      "interactions": "Interaksi",
      "label_scanner": "Pemindai Label",
      "biomarkers": "Biomarker",
      "active_stacks": "Kombinasi Aktif",
      "reminders": "Pengingat",
      "hydration": "Hidrasi",
      "health_insights": "Wawasan Kesehatan",
      "community_feed": "Komunitas Feed",
      "profile": "Profil",
      "settings": "Pengaturan",
      "add_supplement": "Tambah Suplemen",
      "good_afternoon": "Selamat siang!",
      "good_morning": "Selamat pagi!",
      "good_evening": "Selamat malam!",
      "progress": "Kemajuan",
      "supps_taken": "Diminum",
      "warnings": "Peringatan",
      "inventory": "Inventaris",
      "todays_schedule": "Jadwal Hari Ini",
      "critical_interactions": "Interaksi Kritis",
      "reset": "Atur Ulang",
      "morning": "Pagi",
      "midday": "Siang",
      "evening": "Sore / Malam",
      "search_placeholder": "Cari suplemen...",
      "custom_amount": "Jumlah Kustom",
      "take": "Minum",
      "snooze": "Tunda",
      "drank_glass": "Minum segelas",
      "expert_tips": "Tips Ahli",
      "safety_first": "Utamakan Keselamatan",
      "logout": "Keluar Akun",
      "personal_info": "Informasi Pribadi",
      "security_password": "Keamanan & Kata Sandi",
      "billing_sub": "Tagihan & Langganan",
      "notifications": "Notifikasi",
      "account_settings": "Pengaturan Akun",
      "height": "Tinggi",
      "weight": "Berat",
      "health_conditions": "Kondisi Kesehatan",
      "metabolic_vitality": "Vitalitas Metabolik",
      "recent_reports": "Laporan Terbaru",
      "preferences": "Preferensi",
      "daily_reminders": "Pengingat Harian",
      "app_language": "Bahasa Aplikasi",
      "icloud_sync": "Sinkronisasi iCloud",
      "pharmacy_grade": "Standar Apoteker",
      "biometric_login": "Login Biometrik (FaceID)",
      "offline_caching": "Penyimpanan Lokal Offline",
      "automated_spacing": "Pemberitahuan Jeda Otomatis",
      "email_summary": "Ringkasan Email Mingguan",
      "pdf_report": "Ekspor Laporan Mingguan PDF",
      "backup_google": "Cadangkan ke Google Drive",
      "invite_friends": "Undang Teman & Keluarga",
      "privacy_policy": "Kebijakan Privasi Data",
      "back": "Kembali",
      "undo": "Batalkan",
      "chat_support": "Layanan VitaSync",
      "quick_questions": "Pertanyaan Cepat",
      "welcome_title": "Selamat datang di VitaSync",
      "welcome_desc": "Pelacak kesehatan, suplemen, dan biohacking standar apoteker offline-first yang cerdas. Siap mengoptimalkan usia Anda?",
      "get_started": "Mulai Sekarang"
    }
  }
};
