import { materials } from '../data/materials';
import { saveHistory } from './historyService';

export const generateRecommendation = (formData) => {
  let scoredMaterials = materials.map(mat => {
    let score = 50;

    // Oxygen sensitivity logic
    if (formData.oxygenSensitivity === 'high') {
      score += (mat.barrierPerformance * 3);
      if (mat.otr.includes('Low') || mat.otr.includes('Zero')) score += 20;
      if (mat.otr.includes('High')) score -= 30;
    } else if (formData.oxygenSensitivity === 'low') {
      if (mat.otr.includes('High')) score += 10;
    }

    // Moisture sensitivity logic
    if (formData.moistureSensitivity === 'high') {
      score += (mat.barrierPerformance * 3);
      if (mat.wvtr.includes('Low') || mat.wvtr.includes('Zero')) score += 20;
      if (mat.wvtr.includes('High')) score -= 30;
    }

    // Shelf life logic
    if (Number(formData.shelfLife) > 180) { 
      score += (mat.barrierPerformance * 2);
    }

    // Priorities
    if (formData.costPriority === 'high') {
      score += ((10 - mat.costLevel) * 4);
    }
    
    if (formData.sustainabilityPriority === 'high') {
      score += (mat.sustainabilityLevel * 5);
    }

    return { ...mat, score };
  });

  // Rank by score
  scoredMaterials.sort((a, b) => b.score - a.score);

  const topMaterial = scoredMaterials[0];
  const alternatives = scoredMaterials.slice(1, 4);

  // Generate a structure string based on the top material
  let structure = topMaterial.name;
  if (topMaterial.name === 'PET') structure = 'PET / PE (Sealant)';
  if (topMaterial.name === 'Metallized BOPP') structure = 'BOPP / Met BOPP / PE';
  if (topMaterial.name === 'BOPP') structure = 'BOPP / PE';

  const explanation = `Based on your requirements for ${formData.oxygenSensitivity} oxygen sensitivity and ${formData.moistureSensitivity} moisture sensitivity, along with a ${formData.costPriority} focus on cost, ${topMaterial.name} is recommended. It provides an optimal balance of barrier properties (${topMaterial.barrierPerformance}/10) and cost efficiency (${topMaterial.costLevel}/10).`;

  const result = {
    id: Date.now().toString(),
    type: 'recommendation',
    timestamp: new Date().toISOString(),
    formData,
    recommendedMaterial: topMaterial,
    suitabilityScore: Math.min(Math.round(topMaterial.score), 98), 
    alternatives,
    recommendedStructure: structure,
    explanation,
    estimatedShelfLife: `${formData.shelfLife} ${formData.shelfLifeUnit}`
  };

  saveHistory(result);
  
  return result;
};
