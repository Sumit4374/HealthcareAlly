// Machine Learning Models for HealthPal

export class MedicationAdherencePredictor {
  private model: any = null

  constructor() {
    // Initialize with pre-trained weights (simulated)
    this.model = {
      weights: {
        age: 0.15,
        medicationComplexity: -0.3,
        sideEffects: -0.25,
        socialSupport: 0.2,
        previousAdherence: 0.4,
        reminderFrequency: 0.1,
      },
      bias: 0.1,
    }
  }

  predict(patientData: {
    age: number
    medicationCount: number
    sideEffectsSeverity: number // 1-5 scale
    socialSupportScore: number // 1-5 scale
    previousAdherenceRate: number // 0-1
    reminderFrequency: number // reminders per day
  }): {
    adherenceProbability: number
    riskLevel: "low" | "medium" | "high"
    recommendations: string[]
  } {
    const { weights, bias } = this.model

    // Calculate adherence probability using logistic regression
    const linearCombination =
      weights.age * (patientData.age / 100) +
      weights.medicationComplexity * patientData.medicationCount +
      weights.sideEffects * patientData.sideEffectsSeverity +
      weights.socialSupport * patientData.socialSupportScore +
      weights.previousAdherence * patientData.previousAdherenceRate +
      weights.reminderFrequency * patientData.reminderFrequency +
      bias

    const adherenceProbability = 1 / (1 + Math.exp(-linearCombination))

    // Determine risk level
    let riskLevel: "low" | "medium" | "high"
    if (adherenceProbability >= 0.8) riskLevel = "low"
    else if (adherenceProbability >= 0.6) riskLevel = "medium"
    else riskLevel = "high"

    // Generate recommendations
    const recommendations = this.generateRecommendations(patientData, adherenceProbability)

    return {
      adherenceProbability: Math.round(adherenceProbability * 100) / 100,
      riskLevel,
      recommendations,
    }
  }

  private generateRecommendations(patientData: any, probability: number): string[] {
    const recommendations: string[] = []

    if (probability < 0.7) {
      recommendations.push("Increase reminder frequency to improve adherence")
    }

    if (patientData.sideEffectsSeverity > 3) {
      recommendations.push("Consult doctor about side effects management")
    }

    if (patientData.socialSupportScore < 3) {
      recommendations.push("Consider involving family members in medication management")
    }

    if (patientData.medicationCount > 5) {
      recommendations.push("Discuss medication simplification with healthcare provider")
    }

    if (recommendations.length === 0) {
      recommendations.push("Continue current medication routine - good adherence predicted")
    }

    return recommendations
  }
}

export class HealthRiskAssessment {
  assessRisk(patientData: {
    age: number
    bmi: number
    bloodPressure: { systolic: number; diastolic: number }
    cholesterol: number
    smokingStatus: boolean
    diabetesHistory: boolean
    familyHistory: string[]
  }): {
    overallRisk: "low" | "medium" | "high"
    riskFactors: string[]
    recommendations: string[]
    screeningSchedule: string[]
  } {
    const riskFactors: string[] = []
    const recommendations: string[] = []
    const screeningSchedule: string[] = []
    let riskScore = 0

    // Age factor
    if (patientData.age > 65) {
      riskScore += 2
      riskFactors.push("Advanced age")
      screeningSchedule.push("Annual comprehensive health screening")
    } else if (patientData.age > 45) {
      riskScore += 1
      screeningSchedule.push("Biennial health screening")
    }

    // BMI factor
    if (patientData.bmi > 30) {
      riskScore += 2
      riskFactors.push("Obesity")
      recommendations.push("Weight management program recommended")
    } else if (patientData.bmi > 25) {
      riskScore += 1
      riskFactors.push("Overweight")
      recommendations.push("Maintain healthy weight through diet and exercise")
    }

    // Blood pressure
    if (patientData.bloodPressure.systolic > 140 || patientData.bloodPressure.diastolic > 90) {
      riskScore += 2
      riskFactors.push("Hypertension")
      recommendations.push("Blood pressure monitoring and management")
      screeningSchedule.push("Monthly blood pressure checks")
    }

    // Cholesterol
    if (patientData.cholesterol > 240) {
      riskScore += 2
      riskFactors.push("High cholesterol")
      recommendations.push("Cholesterol management through diet and medication")
    }

    // Smoking
    if (patientData.smokingStatus) {
      riskScore += 3
      riskFactors.push("Smoking")
      recommendations.push("Smoking cessation program strongly recommended")
    }

    // Diabetes
    if (patientData.diabetesHistory) {
      riskScore += 2
      riskFactors.push("Diabetes history")
      screeningSchedule.push("Quarterly HbA1c testing")
    }

    // Family history
    if (patientData.familyHistory.includes("heart_disease")) {
      riskScore += 1
      riskFactors.push("Family history of heart disease")
      screeningSchedule.push("Annual cardiac screening")
    }

    // Determine overall risk
    let overallRisk: "low" | "medium" | "high"
    if (riskScore >= 6) overallRisk = "high"
    else if (riskScore >= 3) overallRisk = "medium"
    else overallRisk = "low"

    return {
      overallRisk,
      riskFactors,
      recommendations,
      screeningSchedule,
    }
  }
}

export class DrugInteractionChecker {
  private interactions: { [key: string]: string[] } = {
    warfarin: ["aspirin", "ibuprofen", "naproxen"],
    metformin: ["alcohol", "contrast_dye"],
    lisinopril: ["potassium_supplements", "nsaids"],
    simvastatin: ["grapefruit", "cyclosporine"],
  }

  checkInteractions(medications: string[]): {
    hasInteractions: boolean
    interactions: Array<{
      drug1: string
      drug2: string
      severity: "mild" | "moderate" | "severe"
      description: string
    }>
    recommendations: string[]
  } {
    const foundInteractions: Array<{
      drug1: string
      drug2: string
      severity: "mild" | "moderate" | "severe"
      description: string
    }> = []

    const recommendations: string[] = []

    // Check for known interactions
    medications.forEach((med1, index) => {
      medications.slice(index + 1).forEach((med2) => {
        const med1Lower = med1.toLowerCase()
        const med2Lower = med2.toLowerCase()

        if (this.interactions[med1Lower]?.includes(med2Lower) || this.interactions[med2Lower]?.includes(med1Lower)) {
          foundInteractions.push({
            drug1: med1,
            drug2: med2,
            severity: this.getSeverity(med1Lower, med2Lower),
            description: this.getInteractionDescription(med1Lower, med2Lower),
          })
        }
      })
    })

    // Generate recommendations
    if (foundInteractions.length > 0) {
      recommendations.push("Consult with your doctor about potential drug interactions")
      recommendations.push("Monitor for unusual symptoms or side effects")

      if (foundInteractions.some((i) => i.severity === "severe")) {
        recommendations.push("URGENT: Contact your healthcare provider immediately")
      }
    }

    return {
      hasInteractions: foundInteractions.length > 0,
      interactions: foundInteractions,
      recommendations,
    }
  }

  private getSeverity(drug1: string, drug2: string): "mild" | "moderate" | "severe" {
    // Simplified severity assessment
    if ((drug1 === "warfarin" && drug2 === "aspirin") || (drug1 === "aspirin" && drug2 === "warfarin")) {
      return "severe"
    }
    return "moderate"
  }

  private getInteractionDescription(drug1: string, drug2: string): string {
    // Simplified interaction descriptions
    if ((drug1 === "warfarin" && drug2 === "aspirin") || (drug1 === "aspirin" && drug2 === "warfarin")) {
      return "Increased risk of bleeding"
    }
    return "Potential interaction - monitor closely"
  }
}

// AI-powered symptom analysis
export class SymptomAnalyzer {
  analyzeSymptoms(
    symptoms: string[],
    patientHistory: any,
  ): {
    possibleConditions: Array<{
      condition: string
      probability: number
      urgency: "low" | "medium" | "high"
    }>
    recommendations: string[]
    urgencyLevel: "low" | "medium" | "high"
  } {
    const possibleConditions: Array<{
      condition: string
      probability: number
      urgency: "low" | "medium" | "high"
    }> = []

    const recommendations: string[] = []

    // Simple symptom matching (in real implementation, this would use NLP and ML)
    const symptomMap: {
      [key: string]: Array<{ condition: string; probability: number; urgency: "low" | "medium" | "high" }>
    } = {
      "chest pain": [
        { condition: "Heart Attack", probability: 0.3, urgency: "high" },
        { condition: "Angina", probability: 0.4, urgency: "medium" },
        { condition: "Muscle Strain", probability: 0.3, urgency: "low" },
      ],
      fever: [
        { condition: "Viral Infection", probability: 0.6, urgency: "low" },
        { condition: "Bacterial Infection", probability: 0.3, urgency: "medium" },
        { condition: "COVID-19", probability: 0.1, urgency: "medium" },
      ],
      headache: [
        { condition: "Tension Headache", probability: 0.7, urgency: "low" },
        { condition: "Migraine", probability: 0.2, urgency: "medium" },
        { condition: "Cluster Headache", probability: 0.1, urgency: "high" },
      ],
      "shortness of breath": [
        { condition: "Asthma", probability: 0.4, urgency: "medium" },
        { condition: "Heart Failure", probability: 0.3, urgency: "high" },
        { condition: "Anxiety", probability: 0.3, urgency: "low" },
      ],
    }

    // Analyze symptoms
    symptoms.forEach((symptom) => {
      const matches = symptomMap[symptom.toLowerCase()]
      if (matches) {
        matches.forEach((match) => {
          const existing = possibleConditions.find((c) => c.condition === match.condition)
          if (existing) {
            existing.probability = Math.min(1, existing.probability + match.probability * 0.5)
          } else {
            possibleConditions.push({ ...match })
          }
        })
      }
    })

    // Sort by probability
    possibleConditions.sort((a, b) => b.probability - a.probability)

    // Determine overall urgency
    const maxUrgency = possibleConditions.reduce(
      (max, condition) => {
        if (condition.urgency === "high") return "high"
        if (condition.urgency === "medium" && max !== "high") return "medium"
        return max
      },
      "low" as "low" | "medium" | "high",
    )

    // Generate recommendations
    if (maxUrgency === "high") {
      recommendations.push("Seek immediate medical attention")
      recommendations.push("Consider calling emergency services")
    } else if (maxUrgency === "medium") {
      recommendations.push("Schedule an appointment with your doctor within 24-48 hours")
      recommendations.push("Monitor symptoms closely")
    } else {
      recommendations.push("Consider rest and over-the-counter remedies")
      recommendations.push("Contact doctor if symptoms worsen")
    }

    return {
      possibleConditions: possibleConditions.slice(0, 3), // Top 3 conditions
      recommendations,
      urgencyLevel: maxUrgency,
    }
  }
}
