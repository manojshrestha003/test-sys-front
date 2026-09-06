
import { AdminLayout } from '@/app/lauouts/AdminLayout';
import { Checkbox } from '@/common/components/ui/Checkbox';
import { useState } from 'react';
import { Dropdown } from '@/common/components/ui/Dropdown';
import { RadioGroup } from '@/common/components/ui/Radio';

const SettingsPage = () => {
    const [agreed, setAgreed] = useState(false)
    const [category, setCategory] = useState("all");
    const categories = [
    { value: "all", label: "All Subjects" },
    { value: "cs", label: "Computer Science" },
    { value: "math", label: "Mathematics" },
    { value: "physics", label: "Physics (Archived)", disabled: true },
  ];
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const options = [
    { value: "a", label: "A) O(1) Time Complexity" },
    { value: "b", label: "B) O(log n) Time Complexity" },
    { value: "c", label: "C) O(n) Time Complexity" },
    { value: "d", label: "D) O(n²) Time Complexity" },
  ];

  return (
    <AdminLayout>
        <div>index</div>
 <Checkbox
      label="I accept the Terms and Conditions"
      description="You must accept terms before starting the exam."
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
    />
  <Dropdown
      label="Subject Category"
      options={categories}
      value={category}
      onChange={setCategory}
      placeholder="Select subject..."
    />


<RadioGroup
      name="question-1"
      label="1. What is the time complexity of Binary Search in a sorted array?"
      options={options}
      value={selectedAnswer}
      onChange={setSelectedAnswer}
    />
            
    </AdminLayout>
    
  )
}

export default SettingsPage;